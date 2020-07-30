import pathToRegexp from 'path-to-regexp';
import { BASE_URL } from 'config/config'

export default {

    login:`${BASE_URL}/login`,
    GetOrders: `${BASE_URL}/GetOrders`,
    GetOrderDetail: pathToRegexp.compile(`${BASE_URL}/GetOrderDetails/:id`),
    updateOrderDetail: `${BASE_URL}/UpdateOrder`,
    getReviews: `${BASE_URL}/getAllReviews`,
    hideReview: `${BASE_URL}/hideReview`,
    getLaundries: `${BASE_URL}/getAllProvider`,
    deleteLaundry: `${BASE_URL}/deleteProvider`,
    updateLaundry: `${BASE_URL}/updateProvider`,
    createLaundry: `${BASE_URL}/createProvider`,
    getLaundryDetail: pathToRegexp.compile(`${BASE_URL}/getProvider/:id`),
    getCategoriesItems:`${BASE_URL}/getCategoriesItems`,
    getCategories: `${BASE_URL}/getCategories/`,
    getCustomers: `${BASE_URL}/getAllCustomers`,
    customerDetail: pathToRegexp.compile(`${BASE_URL}/GetCustomer/:id`),
    updateCustomer: `${BASE_URL}/updateCustomer`,
    createCustomer: `${BASE_URL}/createCustomer`,
    deleteCustomer: `${BASE_URL}/deleteCustomer`,
    getCategoryDetail:pathToRegexp.compile(`${BASE_URL}/getCategory/:id`),
    updateCategory: `${BASE_URL}/updateCategory`,
    deleteCategory: `${BASE_URL}/deleteCategory`,
    createCategory: `${BASE_URL}/addNewCategories`,

    getItems: `${BASE_URL}/getItems/`,
    getItemDetail:pathToRegexp.compile(`${BASE_URL}/getItem/:id`),
    updateItem: `${BASE_URL}/updateItem`,
    deleteItem: `${BASE_URL}/deleteItem`,
    createItem: `${BASE_URL}/addNewItems`,

    getGoCredits: `${BASE_URL}/GoCreditPackages/`,
    getGoCreditDetail:pathToRegexp.compile(`${BASE_URL}/GoCreditPackage/:id`),
    updateGoCredit: `${BASE_URL}/updateGoCredit`,
    deleteGoCredit: `${BASE_URL}/deleteGoCredit`,
    createGoCredit: `${BASE_URL}/createGoCredit`,


    getProviderRevenueReport: `${BASE_URL}/getProviderRevenueReport`,
    getUserRevenueReport:`${BASE_URL}/getUserRevenueReport`,
    getNotifications:`${BASE_URL}/getNotifications`,
    updateNotifications:`${BASE_URL}/updateNotifications`,
    
    getOrderReassignData: `${BASE_URL}/getOrderReassignData`,
    reassignOrder: `${BASE_URL}/reassignOrder`,

    getAreas:`${BASE_URL}/areas`,
    getCategoryAreas:`${BASE_URL}/getCategoryAreas`,
    getAreasDetail:pathToRegexp.compile(`${BASE_URL}/areas/:id`),
    updateAreas:`${BASE_URL}/updateAreas`,
    createAreas:`${BASE_URL}/createAreas`,
    deleteAreas:`${BASE_URL}/deleteAreas`,
    

    getCatAreasDetail:pathToRegexp.compile(`${BASE_URL}/catAreas/:id`),
    updateCatAreas:`${BASE_URL}/updateCatAreas`,
    createCatAreas:`${BASE_URL}/createCatAreas`,
    deleteCatAreas:`${BASE_URL}/deleteCatAreas`

}