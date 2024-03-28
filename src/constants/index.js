export const apiDomain = "https://api.photokrafft.com/api/"
export const devDomain = "http://127.0.0.1:8000/api/"

export const apiRoutes = {
    login: `${apiDomain}auth/login`,
    session: `${apiDomain}auth/session`,
    costomer: `${apiDomain}costomer`,
    productReq: `${apiDomain}product`,
    orientationReq: `${apiDomain}orientation`,
    sizeReq: `${apiDomain}Size`,
    paperReq: `${apiDomain}paper`,
    sheetReq: `${apiDomain}sheet`,
    coversReq: `${apiDomain}covers`,
    coversupgradesReq: `${apiDomain}coversupgrades`,
    colorsReq: `${apiDomain}colors`,
    boxsleeveReq: `${apiDomain}boxsleeve`,
    countryzoneReq: `${apiDomain}countryzone`,
    orderReq: `${apiDomain}order`,
    invoiceReq: `${apiDomain}invoice`,
    boxsleeveupgradesReq: `${apiDomain}boxsleeveupgrades`,
    adminUser: `${apiDomain}adminusers`,
    notifications: `${apiDomain}notifications`,
}

export const statusCode = {
    success: 200,
    created: 201,
    bad_request: 400,
    unauthorized: 401,
    unValidate: 422,
    internal_server_error: 500,
}
