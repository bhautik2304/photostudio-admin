/* eslint-disable import/no-cycle */
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { apiRoutes, statusCode, } from "../constants";
import adminAxios from "./adminAxios";
import { fetchAdminUsers } from '../redux/slices/user';

export function HookComponents() {
    const dispatch = useDispatch();
    return dispatch;
}

export const api = {
    notifications: {
        getAll: () => adminAxios(apiRoutes.notifications),
        readAll: () => adminAxios.put(`${apiRoutes.notifications}/read`),
        deleteAll: () => adminAxios.delete(`${apiRoutes.notifications}/delete`),
    },
    authApi: {
        login: (data, cache) => adminAxios.post(apiRoutes.login, data).catch((e) => {
            console.log("error in login Api", e)
            cache()
        }),
        forgetPassword: (data, cache) => adminAxios.post(apiRoutes.login, data).catch((e) => {
            console.log("error in login Api", e)
            cache()
        }),
        otpVerify: (data, cache) => adminAxios.post(apiRoutes.login, data).catch((e) => {
            console.log("error in login Api", e)
            cache()
        }),
        resetPassword: (data, cache) => adminAxios.post(apiRoutes.login, data).catch((e) => {
            console.log("error in login Api", e)
            cache()
        }),

    },
    customerApi: {
        Read: () => adminAxios.get(apiRoutes.costomer),
        Create: (data) => adminAxios.post(apiRoutes.costomer, data),
        Update: (id, data) => adminAxios.put(`${apiRoutes.costomer}/${id}`, data),

        approved: (id,) => adminAxios.post(`${apiRoutes.costomer}/approve/${id} `),
        status: (id, data) => adminAxios.post(`${apiRoutes.costomer}/status/${id}`, data),
        zoneChange: (id, data) => adminAxios.post(`${apiRoutes.costomer}/zoneupdate/${id}`, data),
    },

    productApi: {
        Read: () => adminAxios.get(apiRoutes.productReq),
        Create: (data) => adminAxios.post(apiRoutes.productReq, data),
        Delete: (id) => adminAxios.delete(`${apiRoutes.productReq}/${id}`),
        Update: (id, data) => adminAxios.put(`${apiRoutes.productReq}/${id}`, data),

        productalbumcopyprice: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}/productalbumcopyprice`, data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}/${id}`, data)
        },
        productsize: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}/productsize`, data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}/${id}`, data)
        },
        productorientation: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}/productorientation`, data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}/${id}`, data)
        },
        sheet: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}/sheet`, data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}/${id}`, data)
        },
        productshetprice: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}/productshetprice`, data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}/${id}`, data)
        },
        productpaper: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}/productpaper`, data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}/${id}`, data)
        },
        productcover: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}/productcover`, data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}/${id}`, data)
        },
        productcoverprice: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}/productcoverprice`, data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}/${id}`, data)
        },
        productboxsleeve: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}/productboxsleeve`, data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}/${id}`, data)
        },
        productboxsleeveprice: {
            create: (data) => adminAxios.post(`${apiRoutes.productReq}/productboxsleeveprice`, data),
            update: (id, data) => adminAxios.put(`${apiRoutes.productReq}/${id}`, data)
        },

    },

    productResourceApi: {
        orientation: {
            Read: () => adminAxios.get(apiRoutes.orientationReq),
            Create: (data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(apiRoutes.orientationReq, data).then((response) => {
                    if (response.data.code === statusCode.created) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch((e) => {
                    console.log(e)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Delete: (id, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.delete(`${apiRoutes.orientationReq}/${id}`).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch((e) => {
                    console.log(e)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Update: (id, data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(`${apiRoutes.orientationReq}/update/${id}`, data).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch((e) => {
                    console.log(e)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
        },
        Size: {
            Read: () => adminAxios.get(apiRoutes.sizeReq),
            Create: (data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(apiRoutes.sizeReq, data).then((response) => {
                    if (response.data.code === statusCode.created) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch((e) => {
                    console.log(e)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Delete: (id, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.delete(`${apiRoutes.sizeReq}/${id}`).then(response => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success()
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch((e) => {
                    console.log(e)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Update: (id, data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(`${apiRoutes.sizeReq}/update/${id}`, data).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
        },
        paper: {
            Read: () => adminAxios.get(apiRoutes.paperReq),
            Create: (data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(apiRoutes.paperReq, data).then((response) => {
                    if (response.data.code === statusCode.created) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Delete: (id, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.delete(`${apiRoutes.paperReq}/${id}`).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Update: (id, data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(`${apiRoutes.paperReq}/update/${id}`, data).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
        },
        sheet: {
            Read: () => adminAxios.get(apiRoutes.sheetReq),
            Create: (data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(apiRoutes.sheetReq, data).then((response) => {
                    if (response.data.code === statusCode.created) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Delete: (id, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.delete(`${apiRoutes.sheetReq}/${id}`).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Update: (id, data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(`${apiRoutes.sheetReq}/update/${id}`, data).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
        },
        covers: {
            Read: () => adminAxios.get(apiRoutes.coversReq),
            Create: (data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(apiRoutes.coversReq, data).then((response) => {
                    if (response.data.code === statusCode.created) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Delete: (id, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.delete(`${apiRoutes.coversReq}/${id}`).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Update: (id, data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(`${apiRoutes.coversReq}/update/${id}`, data).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
        },
        coversupgrades: {
            Read: () => adminAxios.get(apiRoutes.coversupgradesReq),
            Create: (data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(apiRoutes.coversupgradesReq, data).then((response) => {
                    if (response.data.code === statusCode.created) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Delete: (id, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.delete(`${apiRoutes.coversupgradesReq}/${id}`).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Update: (id, data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(`${apiRoutes.coversupgradesReq}/update/${id}`, data).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
        },
        colors: {
            Read: () => adminAxios.get(apiRoutes.colorsReq),
            Create: (data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(apiRoutes.colorsReq, data).then((response) => {
                    if (response.data.code === statusCode.created) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Delete: (id, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.delete(`${apiRoutes.colorsReq}/${id}`).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Update: (id, data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(`${apiRoutes.colorsReq}/update/${id}`, data).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
        },
        boxsleeve: {
            Read: () => adminAxios.get(apiRoutes.boxsleeveReq),
            Create: (data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(apiRoutes.boxsleeveReq, data).then((response) => {
                    if (response.data.code === statusCode.created) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Delete: (id, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.delete(`${apiRoutes.boxsleeveReq}/${id}`).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Update: (id, data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(`${apiRoutes.boxsleeveReq}/update/${id}`, data).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
        },
        boxsleeveupgrades: {
            Read: () => adminAxios.get(apiRoutes.boxsleeveupgradesReq),
            Create: (data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(apiRoutes.boxsleeveupgradesReq, data).then((response) => {
                    if (response.data.code === statusCode.created) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Delete: (id, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.delete(`${apiRoutes.boxsleeveupgradesReq}/${id}`).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
            Update: (id, data, success) => {
                const toastId = toast.loading('Please wait...');
                adminAxios.post(`${apiRoutes.boxsleeveupgradesReq}/update/${id}`, data).then((response) => {
                    if (response.data.code === statusCode.success) {
                        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                        success();
                        setTimeout(() => {
                            toast.dismiss(toastId);
                        }, 5000);
                    }
                }).catch(err => {
                    console.log(err)
                    toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 5000);
                })
            },
        },
    },

    countryzoneApi: {
        Read: () => adminAxios.get(apiRoutes.countryzoneReq),
        Create: (data) => adminAxios.post(apiRoutes.countryzoneReq, data),
        Delete: (id) => adminAxios.delete(`${apiRoutes.countryzoneReq}/${id}`),
        Update: (id, data) => adminAxios.post(`${apiRoutes.countryzoneReq}/update/${id}`, data),
    },

    ordersApi: {
        Read: () => adminAxios.get(apiRoutes.orderReq),

        user_order: (id, data, success) => {
            const toastId = toast.loading('Please wait...');
            adminAxios.post(`${apiRoutes.orderReq}/user_order/${id}`, data).then((response) => {
                if (response.data.code === statusCode.success) {
                    toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                    success();
                    setTimeout(() => {
                        toast.dismiss(toastId);
                    }, 5000);
                }
            }).catch(err => {
                console.log(err)
                toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                setTimeout(() => {
                    toast.dismiss(toastId)
                }, 5000);
            })
        }
        ,
        status: (id, data, success) => {
            const toastId = toast.loading('Please wait...');
            adminAxios.post(`${apiRoutes.orderReq}/status/${id}`, data).then((response) => {
                if (response.data.code === statusCode.success) {
                    toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                    success();
                    setTimeout(() => {
                        toast.dismiss(toastId);
                    }, 5000);
                }
            }).catch(err => {
                console.log(err)
                toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                setTimeout(() => {
                    toast.dismiss(toastId)
                }, 5000);
            })
        }
        ,
        paymentStatus: (id, data, success) => {
            const toastId = toast.loading('Please wait...');
            adminAxios.post(`${apiRoutes.orderReq}/status/${id}/payment`, data).then((response) => {
                if (response.data.code === statusCode.success) {
                    toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                    success();
                    setTimeout(() => {
                        toast.dismiss(toastId);
                    }, 5000);
                }
            }).catch(err => {
                console.log(err)
                toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                setTimeout(() => {
                    toast.dismiss(toastId)
                }, 5000);
            })
        }
        ,
        orderDeliveryDetails: (id, data, success) => {
            const toastId = toast.loading('Please wait...');
            adminAxios.post(`${apiRoutes.orderReq}/delivery/${id}`, data).then((response) => {
                if (response.data.code === statusCode.success) {
                    toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                    success();
                    setTimeout(() => {
                        toast.dismiss(toastId);
                    }, 5000);
                }
            }).catch(err => {
                console.log(err)
                toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                setTimeout(() => {
                    toast.dismiss(toastId)
                }, 5000);
            })
        }
        ,
        sampleorderpermission: (id, success) => {
            const toastId = toast.loading('Please wait...');
            adminAxios.delete(`${apiRoutes.orderReq}/sampleorderpermission/${id}`).then((response) => {
                if (response.data.code === statusCode.success) {
                    toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                    success();
                    setTimeout(() => {
                        toast.dismiss(toastId);
                    }, 5000);
                }
            }).catch(err => {
                console.log(err)
                toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
                setTimeout(() => {
                    toast.dismiss(toastId)
                }, 5000);
            })
        }
    },

    userModule: {
        read: () => adminAxios(apiRoutes.adminUser),
        create: (data, success, error, validate) => {
            const toastId = toast.loading('Please wait...');
            adminAxios.post(apiRoutes.adminUser, data).then(response => {
                if (response.data.code === statusCode.created) {
                    toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                    success();
                    setTimeout(() => {
                        toast.dismiss(toastId);
                    }, 5000);
                }

                if (response.data.code === statusCode.unValidate) {
                    toast.update(toastId, { render: response.data.validationError.msg, type: 'error', isLoading: false });
                    validate(response.data.validationError.data)
                    setTimeout(() => {
                        toast.dismiss(toastId);
                    }, 5000);
                }

            }).catch(errors => {
                console.error('Error in creating user:', errors);
                toast.update(toastId, { render: "Somethig Went Wrong", type: 'error', isLoading: false });
                error(); // You may want to handle error cases
                setTimeout(() => {
                    toast.dismiss(toastId);
                }, 5000);
            });
        },
        update: (id, data, success, error) => {
            const toastId = toast.loading('Please wait...');
            adminAxios.put(`${apiRoutes.adminUser}/${id}`, data).then(response => {
                if (response.data.code === statusCode.created) {
                    toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                    success();
                    setTimeout(() => {
                        toast.dismiss(toastId);
                    }, 5000);
                }
            }).catch(errors => {
                console.error('Error in creating user:', errors);
                toast.update(toastId, { render: "Somethig Went Wrong", type: 'error', isLoading: false });
                error(); // You may want to handle error cases
                setTimeout(() => {
                    toast.dismiss(toastId);
                }, 5000);
            });
        },
        delete: (id, success, error) => {
            const toastId = toast.loading('Please wait...');
            adminAxios.delete(`${apiRoutes.adminUser}/${id}`).then((response) => {
                if (response.data.code === statusCode.success) {
                    toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
                    success();
                    setTimeout(() => {
                        toast.dismiss(toastId);
                    }, 5000);
                }
            }).catch(errors => {
                console.error('Error in creating user:', errors);
                toast.update(toastId, { render: "Somethig Went Wrong", type: 'error', isLoading: false });
                error(); // You may want to handle error cases
                setTimeout(() => {
                    toast.dismiss(toastId);
                }, 5000);
            });
        },

        updatePassword: (id, data) => adminAxios(`${apiRoutes.adminUser}/${id}`, data),
    }
}