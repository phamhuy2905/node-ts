interface Config {
    app: {
        port: string | number;
    };
    db: {
        name: string;
        port: string | number;
        host: string;
    };
}
const dev: Config = {
    app: {
        port: (process.env.DEV_APP_PORT as string) || 4000,
    },

    db: {
        name: process.env.DEV_DB_NAME as string,
        port: process.env.DEV_DB_PORT as string,
        host: process.env.DEV_DB_HOST as string,
    },
};

const pro: Config = {
    app: {
        port: (process.env.PRO_APP_PORT as string) || 4000,
    },

    db: {
        name: process.env.PRO_DB_NAME as string,
        port: process.env.PRO_DB_PORT as string,
        host: process.env.PRO_DB_HOST as string,
    },
};
const config = { dev, pro };

const env = (process.env.NODE_APP as "dev" | "pro") || "dev";

export default config[env];
