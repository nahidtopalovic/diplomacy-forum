import { authAdmin } from '../db/firebase-admin';

export const withAuth = (handler) => {
    return async (req, res) => {
        const authHeader = req.headers.myauth;
        if (!authHeader) {
            return res.status(401).end('Not authenticated. No Auth header');
        }

        const token = authHeader.split(' ')[1];

        let decodedToken;
        try {
            decodedToken = await authAdmin.verifyIdToken(token);
            if (!decodedToken || !decodedToken.uid)
                return res.status(401).end('Not authenticated');
            req.uid = decodedToken.uid;
        } catch (error) {
            console.log(error.errorInfo);
            const errorCode = error.errorInfo.code;
            error.status = 401;
            if (errorCode === 'auth/internal-error') {
                error.status = 500;
            }

            return res.status(error.status).json({ error: errorCode });
        }

        return handler(req, res);
    };
};
