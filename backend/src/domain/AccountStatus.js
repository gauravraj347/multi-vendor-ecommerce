const AccountStatus = Object.freeze({
    PENDING_VERIFICATION: "PENDING_VERIFICATION", // Account is created but not verified
    ACTIVE: "ACTIVE",                             // Account is verified and active
    SUSPENDED: "SUSPENDED",                       // Account is temporarily suspended
    DEACTIVATED: "DEACTIVATED",                   // Account is deactivated by the user
    BANNED: "BANNED",                             // Account is permanently banned
    CLOSED: "CLOSED"                              // Account is permanently closed
});

module.exports = AccountStatus;
