const UserRole = Object.freeze({
    ADMIN: "ROLE_ADMIN",       // Full access to system
    CUSTOMER: "ROLE_CUSTOMER", // Can browse and purchase products
    SELLER: "ROLE_SELLER"      // Can list and manage products
});

module.exports = UserRole;
