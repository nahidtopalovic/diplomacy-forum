import { db } from '../../utils/db/firebase';

const getData = (req, res) => {
    const { tag, key } = req.query;

    const postsFirstBatch = async () => {
        try {
            let posts = [];
            let lastKey = '';

            if (tag) {
                const snapshot = await db
                    .collection('responses')
                    .where('tags', 'array-contains', tag)
                    .orderBy('created', 'desc')
                    .limit(10)
                    .get();
                snapshot.forEach((doc) => {
                    posts.push(doc.data());
                    lastKey = doc.data().created;
                });
            } else {
                const snapshot = await db
                    .collection('responses')
                    .orderBy('created', 'desc')
                    .limit(10)
                    .get();
                snapshot.forEach((doc) => {
                    posts.push(doc.data());
                    lastKey = doc.data().created;
                });
            }

            res.send({ posts, lastKey });
            return;
        } catch (error) {
            console.log(error);
            res.json({ error: 'Error while retrieving data' });
            res.status(500).end();
            return;
        }
    };

    const postsNextBatch = async () => {
        try {
            let posts = [];
            let lastKey = '';

            if (tag) {
                const snapshot = await db
                    .collection('responses')
                    .where('tags', 'array-contains', tag)
                    .orderBy('created', 'desc')
                    .startAfter(key)
                    .limit(10)
                    .get();
                snapshot.forEach((doc) => {
                    posts.push(doc.data());
                    lastKey = doc.data().created;
                });
            } else {
                const snapshot = await db
                    .collection('responses')
                    .orderBy('created', 'desc')
                    .startAfter(key)
                    .limit(10)
                    .get();
                snapshot.forEach((doc) => {
                    posts.push(doc.data());
                    lastKey = doc.data().created;
                });
            }

            res.send({ posts, lastKey });
            return;
        } catch (error) {
            console.log(error);
            res.json({ error: 'Error while retrieving data' });
            res.status(500).end();
            return;
        }
    };

    if (key) {
        postsNextBatch();
    } else {
        postsFirstBatch();
    }
};

export default getData;
