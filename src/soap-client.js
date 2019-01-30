import soap from 'soap-as-promised'

export default async (advcashSoapUrl, soapOptions) => {
    const soapClient = await soap.createClient(advcashSoapUrl, Object.assign({
        endpoint: advcashSoapUrl,
        ignoredNamespaces: {
            namespaces: [],
            override: true
        }
    }, soapOptions))

    return async (operation, args, map) => {
        const response = await soapClient[operation].call(this, args)
        return map ? map(response.return) : response.return
    }
}