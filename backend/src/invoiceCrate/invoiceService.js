import mongoose from "mongoose";
import CartModel from "../model/CartModel.js";
import InvoiceModel from '../model/InvoiceModel.js';
import InvoiceProductModel from '../model/InvoiceProductModel.js'; // এটি যোগ করতে হবে
import PaymentSettingModel from '../model/PaymentSettingModel.js';
import UserModel from '../model/UserModel.js'; // ইউজার প্রোপাইল লাগলে
import WishModel from '../model/WishModel.js'
import ProfileModel from "../model/ProfileModel.js";
import axios from "axios";
import FormData from "form-data"; 

let ObjectID = mongoose.Types.ObjectId;




export const createInvoiceService = async (req) => { // req প্যারামিটার যোগ করা হয়েছে
try {
    const user_id = new ObjectID(req.user._id);
    const cus_email = req.user?.email;

    // যদি userProfile প্রয়োজন হয় (যেমন মডেল থেকে আনা)
    const userProfile = await ProfileModel.findOne({ userID: user_id }); 

    // 1 calculate
    const cartProduct = await CartModel.aggregate([
        { $match: { userID: user_id } },
        {
            $lookup: {
                from: "products", // বানান ঠিক রাখা হয়েছে (proucts থেকে products)
                localField: "productID",
                foreignField: "_id",
                as: "product",
            },
        },
        { $unwind: "$product" },
    ]);

    // ভেরিয়েবল নাম ঠিক করা হয়েছে (cartProduct)
    if (!cartProduct || cartProduct.length === 0) {
        return { status: "fail", message: "Your cart is empty!" };
    }

    let total = 0;

    cartProduct.forEach((element) => {
        const price = element.product.discount 
            ? parseFloat(element.product.discountPrice) 
            : parseFloat(element.product.price);

        const qty = parseFloat(element.qty);
        total += price * qty;
    });

    const vat = total * 0.05; // আপনার প্রয়োজনমতো ভ্যাট পার্সেন্ট দিতে পারেন
    const payable = total + vat;

    // Step 02: Customer & Shipping Details 
    const cus_details = `Name:${userProfile?.cus_name || 'N/A'}, Email:${cus_email}, Address:${userProfile?.cus_add || 'N/A'}, Phone:${userProfile?.cus_phone || 'N/A'}`;
    const ship_details = `Name:${userProfile?.ship_name || 'N/A'}, City:${userProfile?.ship_city || 'N/A'}, Address:${userProfile?.ship_add || 'N/A'}, Phone:${userProfile?.ship_phone || 'N/A'}`;

    // Step 03: Transaction Details
    const tran_id = Math.floor(10000000 + Math.random() * 90000000).toString();
    const val_id = "0";
    const delivery_status = "pending";
    const payment_status = "pending";

    const createinvoice = await InvoiceModel.create({
        userID: user_id,
        payable,
        cus_details,
        ship_details,
        tran_id,
        val_id,
        payment_status,
        delivery_status,
        total,
        vat
    });

    // Step 05: Create Invoice Products
    const invoice_id = createinvoice._id;
    for (const element of cartProduct) { // cartProduct ব্যবহার করা হয়েছে
        await InvoiceProductModel.create({
            userID: user_id,
            productID: element.productID,
            invoiceID: invoice_id,
            qty: Number(element.qty) || 1,
            price: element.product.discount
                ? element.product.discountPrice
                : element.product.price,
            color: element.color || "N/A",
            size: element.size || "N/A",
        });
    }

    // পেমেন্ট গেটওয়েতে রিডাইরেক্ট হওয়ার আগে কার্ট না মুছে পেমেন্ট সফল হওয়ার পর মোচাই শ্রেয়, 
    // তবে আপনার লজিক অনুযায়ী পেমেন্ট ইনিশিওট করার সময় মুছতে চাইলে রাখতে পারেন।

    const PaymentSettings = await PaymentSettingModel.findOne({});
    if (!PaymentSettings) { // অবজেক্টের ক্ষেত্রে length চেক না করে অস্তিত্ব চেক করতে হয়
        return { status: "fail", message: "Payment settings not found in database!" };
    }

   const form = new FormData();
    form.append("store_id", PaymentSettings.store_id);
    form.append("store_passwd", PaymentSettings.store_password);
    form.append("total_amount", payable.toString());
    form.append("currency", PaymentSettings.currency);
    form.append("tran_id", tran_id);

    // এখানে স্পেস রিমুভ করে সঠিক করা হয়েছে
    form.append("success_url", `${PaymentSettings.success_url}/${tran_id}`);
    form.append("fail_url", `${PaymentSettings.fail_url}/${tran_id}`);
    form.append("cancel_url", `${PaymentSettings.cancel_url}/${tran_id}`);
    form.append("ipn_url", `${PaymentSettings.ipn_url}/${tran_id}`);

    // Customer Info
    form.append("cus_name", userProfile?.cus_name || "Customer Name");
    form.append("cus_email", cus_email || "customer@example.com");
    form.append("cus_add1", userProfile?.cus_add || "Dhaka");
    form.append("cus_add2", userProfile?.cus_add || "Dhaka");
    form.append("cus_city", userProfile?.cus_city || "Dhaka");
    form.append("cus_state", userProfile?.cus_state || "Dhaka");
    form.append("cus_postcode", userProfile?.cus_postcode || "1000");
    form.append("cus_country", userProfile?.cus_country || "Bangladesh");
    form.append("cus_phone", userProfile?.cus_phone || "01700000000");
    form.append("cus_fax", userProfile?.cus_phone || "01700000000");

    // Shipping Info
    form.append("shipping_method", "YES");
    form.append("ship_name", userProfile?.ship_name || "Ship Name");
    form.append("ship_add1", userProfile?.ship_add || "Dhaka");
    form.append("ship_add2", userProfile?.ship_add || "Dhaka");
    form.append("ship_city", userProfile?.ship_city || "Dhaka");
    form.append("ship_state", userProfile?.ship_state || "Dhaka");
    form.append("ship_country", userProfile?.ship_country || "Bangladesh");
    form.append("ship_postcode", userProfile?.ship_postcode || "1000");

    // Product Info
    form.append("product_name", "Invoice Products");
    form.append("product_category", "Ecommerce");
    form.append("product_profile", "general");

    const SSLRes = await axios.post(PaymentSettings.init_url, form, {
        headers: form.getHeaders(),
    });

    if (SSLRes.status === 200 && SSLRes.data?.GatewayPageURL) {
        // গেটওয়ে ইউআরএল সফলভাবে ডেটা হিসেবে রিটার্ন করা হচ্ছে
        return { status: "success", data: SSLRes.data.GatewayPageURL }; 
    }
    return { status: "fail", message: "Payment initiation failed", details: SSLRes.data };
} catch (error) {
    return { status: "fail", message: error.message };
}
}


export const PaymentSuccessService = async (req) => {
    try {
        const trxID = req.params.trxID;
        const sslData = req.body; // SSLCommerz থেকে আসা ডাটা

        // ১. ডাটাবেসে পেমেন্ট স্ট্যাটাস এবং val_id আপডেট
        const updateResult = await InvoiceModel.updateOne(
            { tran_id: trxID },
            { payment_status: "Paid", val_id: sslData.val_id }
        );

        // ২. পেমেন্ট সফল হলে ঐ ইনভয়েসের ইউজারের কার্ট ক্লিয়ার করা
        const invoice = await InvoiceModel.findOne({ tran_id: trxID });
        if (invoice) {
            await CartModel.deleteMany({ userID: invoice.userID });
        }

        return { status: "success", data: updateResult };
    } catch (error) {
        return { status: "fail", message: error.toString() };
    }
};

export const PaymentFailService = async (req) => {
  try {
    const trxID = req.params.trxID;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "fail" }
    );
    return { status: "fail" };
  } catch {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

export const PaymentCancelService = async (req) => {
  try {
    const trxID = req.params.trxID;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "cancel" }
    );
    return { status: "cancel" };
  } catch {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

export const PaymentIPNService = async (req) => {
  try {
    const trxID = req.params.trxID;
    const status = req.body.status;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: status }
    );
    return { status: "success" };
  } catch {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

export const InvoiceListService = async (req) => {
  try {
    const user_id = new ObjectID(req.user._id);
    const invoice = await InvoiceModel.find({ userID: user_id });
    return { status: "success", data: invoice };
  } catch {
    return { status: "fail", message: "Something Went Wrong" };
  }
};


export const InvoiceProductListService = async (req) => {
  try {
    const user_id = new ObjectID(req.user._id);

    const products = await InvoiceProductModel.aggregate([
      { $match: { userID: user_id } },  // invoice_id filter remove
      {
        $lookup: {
          from: "products",
          localField: "productID",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      // ... baki pipeline same rakho
    ]);

    return { status: "success", data: products };
  } catch (error) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};




export const SavePaymentSettingService = async (req) => {
  try {
    const reqBody = req.body;

    // ডাটাবেজে আগে থেকে কোনো সেটিংস আছে কিনা চেক করা
    const existingSetting = await PaymentSettingModel.findOne({});

    if (existingSetting) {
      // থাকলে আপডেট হবে
      const updatedData = await PaymentSettingModel.updateOne(
        { _id: existingSetting._id },
        { $set: reqBody }
      );
      return { status: "success", message: "Payment settings updated successfully", data: updatedData };
    } else {
      // না থাকলে নতুন তৈরি হবে
      const data = await PaymentSettingModel.create(reqBody);
      return { status: "success", message: "Payment settings created successfully", data: data };
    }
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};



//admin

export const adminOrderListService = async()=>{

try {
  const orders = await InvoiceModel.find({}).populate("userID", "name email").sort({ createdAt: -1 });

  return { status: "success", data: orders };
} catch (error) {
  return { status: "fail", message: error.message };
}





}



// Admin: update one order's delivery_status


export const UpdateOrderService = async(req)=>{


try {
  const id= req.params.id;
  const { delivery_status }= req.body;
const allowedStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

if (!allowedStatuses.includes(delivery_status)) {
  return { status: "fail", message: "Invalid delivery status" };
}

const order = await InvoiceModel.findById(id);

if (!order) {
  return { status: "fail", message: "Order not found" };
}

order.delivery_status = delivery_status;
await order.save();

return { status: "success", message: "Order updated successfully", data: order };

} catch (error) {
  return { status: "fail", message: error.message };

}




}