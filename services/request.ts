import { getAuthorize } from "../utils/utils";

interface RequestOptions {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: Record<string, any>;
    header?: Record<string, string>;
    timeout?: number;
}

interface Response<T = any> {
    data: T;
    statusCode: number;
    header: Record<string, string>;
}

export interface BizResponse<T = any> {
    ret: number;
    msg: string;
    datas: T
}

export interface PaginationRequest {
    page: number
    perPage: number
}

export interface PaginationResponse<T = any> {
    content: T[];
    page: {
      page: number
      pageSize: number
      totalCount: number
      pageCount: number
    }
}

const request = <T = any>(options: RequestOptions): Promise<Response<T>> => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: 'https://www.91sami.com/api/web' + options.url,
            method: options.method || 'GET',
            data: options.data || {},
            header: {
                'access-token': uni.getStorageSync('token') || '',
                ...options.header,
            },
            timeout: options.timeout || 60000,
            success: (res) => {
                if (res.data?.status == 401) {
                    getAuthorize(true).then(res => {
                        resolve(res as any)
                    }).catch(err => {
                        reject(err)
                    })
                    return
                }
                if (Array.isArray(res.data?.datas) && res.data?.datas.length === 0) {
                    resolve(res.data);
                } else {
                    resolve(res.data?.datas || res.data);
                }
            },
            fail: (err) => {
                reject(err);
            },
        });
    });
};


export default {
    get: async <T = any>(option: any) => {
        const res: any = await request({ method: 'GET', ...option });
        return ((res?.message === 'success' || res?.message === '成功' || res?.code == '200' || res.msg === 'success') && res.data && res.msg === 'success')
            ? res?.hasOwnProperty('data')
                ? (res.data as unknown as T)
                : null
            : res;
    },
    post: async <T = any>(option: any) => {
        const res: any = await request({ method: 'POST', ...option });
        return (res?.message === 'success' || res?.message === '成功' || res?.code == 200 || res.msg === 'success')
            ? res?.hasOwnProperty('data')
                ? (res.data as unknown as T)
                : null
            : res;
    },
    postOriginal: async <T = any> (option: any): Promise<T> => {
        const res = await request({ method: 'POST', ...option }) as T;
        return res;
    },
    delete: async <T = any>(option: any) => {
        const res = await request({ method: 'DELETE', ...option });
        return res?.data as unknown as T;
    },
    put: async <T = any>(option: any) => {
        const res: any = await request({ method: 'PUT', ...option });
        return (res?.message === 'success' || res?.message === '成功' || res?.code === 200)
            ? res?.hasOwnProperty('data')
                ? (res.data as unknown as T)
                : null
            : res;
    },
    putOrigin: async <T = any>(option: any): Promise<T> => {
        const res: any = await request({ method: 'PUT', ...option });
        return res;
    },
    download: async <T = any>(option: any) => {
        const res = await request({ method: 'POST', responseType: 'blob', ...option });
        return res as unknown as T;
    },
    upload: async <T = any>(option: any) => {
        option.header = { 'Content-Type': 'multipart/form-data' };
        const res = await request({ method: 'POST', ...option });
        return res as unknown as Promise<T>;
    }
};