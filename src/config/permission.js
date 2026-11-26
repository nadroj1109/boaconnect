// src/config/permission.js

export function permission(
    resource,
    action
) {

    return `${resource}.${action}`;

}