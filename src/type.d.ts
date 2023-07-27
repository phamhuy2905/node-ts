// to make the file a module and avoid the TypeScript error
export {};

declare global {
    namespace Express {
        export interface Request {
            user_id?: string;
            refreshTokenOld?: string;
            keyToken?:
                | (FlattenMaps<IKeyToken> & {
                      _id: Types.ObjectId;
                  })
                | null;
            user?: any;
        }
    }
}
