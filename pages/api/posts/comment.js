import { now, db, firebase } from '../../../utils/db/firebase';
import { authAdmin } from '../../../utils/db/firebase-admin';
import { withAuth } from '../../../utils/middleware/withAuth';
import { v4 as uuid } from 'uuid';

const postComment = async (req, res) => {
    const { postId, text } = req.body;

    if (!postId || !text) {
        res.status(400).json({ error: 'Body is missing' });
    }

    // find username from db based on req.uid
    const user = await authAdmin.getUser(req.uid);
    if (!user) {
        res.status(401).json({ error: 'User does not exists' });
        return;
    }

    const newComment = {
        id: uuid(),
        author: {
            created: user.metadata.creationTime,
            id: user.uid,
            username: user.email.split('@')[0],
        },
        created: now.toDate().toString(),
        score: 0,
        text: text,
        votes: [],
    };

    const docsRef = await db
        .collection('responses')
        .where('id', '==', postId)
        .get();

    if (docsRef.empty) {
        res.status(401).json({ error: 'Post does not exist!' });
    }

    const docId = docsRef.docs[0].id;

    const docRef = db.collection('responses').doc(docId);

    await docRef.update({
        answers: firebase.firestore.FieldValue.arrayUnion(newComment),
    });

    const updatedSnapshot = await db
        .collection('responses')
        .where('id', '==', postId)
        .get();

    if (!updatedSnapshot.empty) {
        const post = updatedSnapshot.docs[0].data();
        res.status(201).send(post);
        return;
    }
};

export default withAuth(postComment);
