
import { apiRoutes } from "../constants";
import adminAxios from "./adminAxios";

export const api = {
    customerApi: {
        Read: () => adminAxios.get(apiRoutes.costomer),
        Create: (data) => adminAxios.post(apiRoutes.costomer, data),
        Delete: (id) => adminAxios.delete(`${apiRoutes.costomer}${id}`),
        Update: (id, data) => adminAxios.put(`${apiRoutes.costomer}${id}`, data),

        approved: (id,) => adminAxios.post(`${apiRoutes.costomer}approve/${id}`),
        status: (id,data) => adminAxios.post(`${apiRoutes.costomer}status/${id}`,data),
        zoneChange: (id, data) => adminAxios.post(`${apiRoutes.costomer}zoneupdate/${id}`, data),
    },

    productApi: {
        Read: () => adminAxios.get(apiRoutes.productReq),
        Create: (data) => adminAxios.post(apiRoutes.productReq, data),
        Delete: (id) => adminAxios.delete(`${apiRoutes.productReq}${id}`),
        Update: (id, data) => adminAxios.put(`${apiRoutes.productReq}${id}`, data),

        productalbumcopyprice: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}productalbumcopyprice`,data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}${id}`, data)
        },
        productsize: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}productsize`,data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}${id}`, data)
        },
        productorientation: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}productorientation`,data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}${id}`, data)
        },
        sheet: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}sheet`,data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}${id}`, data)
        },
        productshetprice: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}productshetprice`,data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}${id}`, data)
        },
        productpaper: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}productpaper`,data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}${id}`, data)
        },
        productcover: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}productcover`,data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}${id}`, data)
        },
        productcoverprice: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}productcoverprice`,data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}${id}`, data)
        },
        productboxsleeve: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}productboxsleeve`,data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}${id}`, data)
        },
        productboxsleeveprice: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}productboxsleeveprice`,data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}${id}`, data)
        },

    },

    productResourceApi: {
        orientation: {
            Read: () => adminAxios.get(apiRoutes.orientationReq),
            Create: (data) => adminAxios.post(apiRoutes.orientationReq, data),
            Delete: (id) => adminAxios.delete(`${apiRoutes.orientationReq}${id}`),
            Update: (id, data) => adminAxios.post(`${apiRoutes.orientationReq}update/${id}`, data),
        },
        Size: {
            Read: () => adminAxios.get(apiRoutes.sizeReq),
            Create: (data) => adminAxios.post(apiRoutes.sizeReq, data),
            Delete: (id) => adminAxios.delete(`${apiRoutes.sizeReq}${id}`),
            Update: (id, data) => adminAxios.post(`${apiRoutes.sizeReq}update/${id}`, data),
        },
        paper: {
            Read: () => adminAxios.get(apiRoutes.paperReq),
            Create: (data) => adminAxios.post(apiRoutes.paperReq, data),
            Delete: (id) => adminAxios.delete(`${apiRoutes.paperReq}${id}`),
            Update: (id, data) => adminAxios.post(`${apiRoutes.paperReq}update/${id}`, data),
        },
        sheet: {
            Read: () => adminAxios.get(apiRoutes.sheetReq),
            Create: (data) => adminAxios.post(apiRoutes.sheetReq, data),
            Delete: (id) => adminAxios.delete(`${apiRoutes.sheetReq}${id}`),
            Update: (id, data) => adminAxios.post(`${apiRoutes.sheetReq}update/${id}`, data),
        },
        covers: {
            Read: () => adminAxios.get(apiRoutes.coversReq),
            Create: (data) => adminAxios.post(apiRoutes.coversReq, data),
            Delete: (id) => adminAxios.delete(`${apiRoutes.coversReq}${id}`),
            Update: (id, data) => adminAxios.post(`${apiRoutes.coversReq}update/${id}`, data),
        },
        coversupgrades: {
            Read: () => adminAxios.get(apiRoutes.coversupgradesReq),
            Create: (data) => adminAxios.post(apiRoutes.coversupgradesReq, data),
            Delete: (id) => adminAxios.delete(`${apiRoutes.coversupgradesReq}${id}`),
            Update: (id, data) => adminAxios.post(`${apiRoutes.coversupgradesReq}update/${id}`, data),
        },
        colors: {
            Read: () => adminAxios.get(apiRoutes.colorsReq),
            Create: (data) => adminAxios.post(apiRoutes.colorsReq, data),
            Delete: (id) => adminAxios.delete(`${apiRoutes.colorsReq}${id}`),
            Update: (id, data) => adminAxios.post(`${apiRoutes.colorsReq}update/${id}`, data),
        },
        boxsleeve: {
            Read: () => adminAxios.get(apiRoutes.boxsleeveReq),
            Create: (data) => adminAxios.post(apiRoutes.boxsleeveReq, data),
            Delete: (id) => adminAxios.delete(`${apiRoutes.boxsleeveReq}${id}`),
            Update: (id, data) => adminAxios.post(`${apiRoutes.boxsleeveReq}update/${id}`, data),
        },
        boxsleeveupgrades: {
            Read: () => adminAxios.get(apiRoutes.boxsleeveupgradesReq),
            Create: (data) => adminAxios.post(apiRoutes.boxsleeveupgradesReq, data),
            Delete: (id) => adminAxios.delete(`${apiRoutes.boxsleeveupgradesReq}${id}`),
            Update: (id, data) => adminAxios.post(`${apiRoutes.boxsleeveupgradesReq}update/${id}`, data),
        },
    },

    countryzoneApi: {
        Read: () => adminAxios.get(apiRoutes.countryzoneReq),
        Create: (data) => adminAxios.post(apiRoutes.countryzoneReq, data),
        Delete: (id) => adminAxios.delete(`${apiRoutes.countryzoneReq}${id}`),
        Update: (id, data) => adminAxios.post(`${apiRoutes.countryzoneReq}update/${id}`, data),
    },

    ordersApi: {
        Read: () => adminAxios.get(apiRoutes.orderReq),
        Create: (data) => adminAxios.post(apiRoutes.orderReq, data),
        Delete: (id) => adminAxios.delete(`${apiRoutes.orderReq}${id}`),
        Update: (id, data) => adminAxios.post(`${apiRoutes.orderReq}$update/{id}`, data),

        user_order: (id, data) => adminAxios.post(`${apiRoutes.orderReq}user_order/${id}`),
        status: (id, data) => adminAxios.post(`${apiRoutes.orderReq}status/${id}`),
        paymentStatus: (id, data) => adminAxios.post(`${apiRoutes.orderReq}status/${id}payment`),
    },

    userModule: {
        read: () => adminAxios(apiRoutes.adminUser),
        create: (data) => adminAxios.post(apiRoutes.adminUser,data),
        update: (id,data) => adminAxios(apiRoutes.adminUser + id,data),
        delete: (id) => adminAxios(apiRoutes.adminUser + id),

        updatePassword:(id,data) => adminAxios(apiRoutes.adminUser + id,data),
    }
}