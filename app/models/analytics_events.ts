// ref: https://developers.google.com/analytics/devguides/collection/ga4/reference/events?sjid=989628820691811072-EU&client_type=gtag#purchase
export type ItemInfo = {
    item_id: string,
    item_name: string
}

export type PurchaseInfo = {
    currency: string,
    value: number,
    transaction_id: string,
    items: Array<ItemInfo>
}
