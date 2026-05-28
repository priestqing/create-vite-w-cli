import { uploadFileFn } from "@/apis/tools"
// export const uploadFileFn = (data: FormData) => req({ url: '/tool/file/upload', method: 'POST', data, headers: { 'Content-Type': 'multipart/form-data' }, showLoad: false })


class MyUploadAdapter {
    loader: any


    constructor(loader: any) {
        this.loader = loader
    }

    upload() {
        return this.loader.file
            .then((file: any) => new Promise((resolve, reject) => {
                this._sendRequest(resolve, reject, file)
            }))
    }

    _sendRequest(resolve: any, reject: any, file: any) {
        const formData = new FormData()
        formData.append('file', file)
        uploadFileFn(formData).then((res) => {
            resolve({
                default: res.data.data
            })
        }).catch(() => {
            reject(false)
        })

    }
}


export function MyCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new MyUploadAdapter(loader)
    }
}