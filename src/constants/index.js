export const apiDomain = "https://api.photokrafft.com/api/"
export const devDomain = "http://127.0.0.1:8000/api/"

export const apiRoutes = {
    login: `${devDomain}auth/login`,
    session: `${devDomain}auth/session`,
    costomer: `${devDomain}costomer`,
    productReq: `${devDomain}product`,
    orientationReq: `${devDomain}orientation`,
    sizeReq: `${devDomain}Size`,
    paperReq: `${devDomain}paper`,
    sheetReq: `${devDomain}sheet`,
    coversReq: `${devDomain}covers`,
    coversupgradesReq: `${devDomain}coversupgrades`,
    colorsReq: `${devDomain}colors`,
    boxsleeveReq: `${devDomain}boxsleeve`,
    countryzoneReq: `${devDomain}countryzone`,
    orderReq: `${devDomain}order`,
    invoiceReq: `${devDomain}invoice`,
    boxsleeveupgradesReq: `${devDomain}boxsleeveupgrades`,
    adminUser: `${devDomain}adminusers`,
    notifications: `${devDomain}notifications`,
}

export const statusCode={
    success:200,
    created:201,
    bad_request:400,
    unauthorized:401,
    unValidate:422,
    internal_server_error:500,
}