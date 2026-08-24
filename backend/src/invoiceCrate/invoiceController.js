import {createInvoiceService,PaymentSuccessService,PaymentFailService,
    PaymentCancelService,PaymentIPNService,InvoiceListService,
    InvoiceProductListService,SavePaymentSettingService,
    adminOrderListService,UpdateOrderService} from "./invoiceService.js";

export const createInvoice = async (req, res) => {
    try {
        const result = await createInvoiceService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const paymentSuccess = async (req, res) => {
    try {
        const result = await PaymentSuccessService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const paymentFail = async (req, res) => {
    try {
        const result = await PaymentFailService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const paymentCancel = async (req, res) => {
    try {
        const result = await PaymentCancelService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const paymentIPN = async (req, res) => {
    try {
        const result = await PaymentIPNService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const invoiceList = async (req, res) => {
    try {
        const result = await InvoiceListService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const invoiceProductList = async (req, res) => {
    try {
        const result = await InvoiceProductListService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const savePaymentSetting = async (req, res) => {
    try {
        const result = await SavePaymentSettingService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const adminOrderList = async (req, res) => {
    try {
        const result = await adminOrderListService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const updateOrder = async (req, res) => {
    try {
        const result = await UpdateOrderService(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}