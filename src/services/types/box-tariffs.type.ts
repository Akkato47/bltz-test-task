export type TResponseBoxTariffs = {
    response: {
        data: TBoxTariffs;
    };
};

export type TBoxTariffs = {
    dtNextBox: string;
    dtTillMax: string;
    warehouseList: TWarehouseList[];
};

type TWarehouseList = {
    boxDeliveryAndStorageExpr: string;
    boxDeliveryBase: string;
    boxDeliveryLiter: string;
    boxStorageBase: string;
    boxStorageLiter: string;
    warehouseName: string;
};
