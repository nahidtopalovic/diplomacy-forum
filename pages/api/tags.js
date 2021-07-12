import { db } from '../../utils/db/firebase';

const getTags = async (req, res) => {
    try {
        let tagsDistinct = new Set();

        const snapshot = await db.collection('responses').get();

        snapshot.forEach((doc) => {
            if (doc.data().tags != undefined) {
                const tags = doc.data().tags;

                tags.forEach((tag) => {
                    tagsDistinct.add(tag);
                });
            }
        });

        const tags = [...tagsDistinct].map((tag) => {
            return {
                value: tag,
                label: tag,
            };
        });

        res.send({ tags });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).end();
        return;
    }
};

export default getTags;
