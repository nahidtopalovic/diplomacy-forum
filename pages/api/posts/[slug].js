import { db } from '../../../utils/db/firebase';

const getData = async (req, res) => {
    const id = req.query.slug;
    try {
        const snapshot = await db
            .collection('responses')
            .where('id', '==', id)
            .get();

        if (!snapshot.empty) {
            console.log('docs', snapshot.docs);
            const data = snapshot.docs[0].data();
            res.send(data);
            return;
        }
        res.end();
        return;
    } catch (error) {
        console.log(error);
        res.json({ error: 'Error while retrieving data' });
        res.status(500).end();
        return;
    }
};

export default getData;
