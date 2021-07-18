import { db } from '../../../../utils/db/firebase';
import { withAuth } from '../../../../utils/middleware/withAuth';

const deleteComment = async (req, res) => {
    try {
        if (req.method != 'DELETE') {
            res.status(405).end();
            return;
        }
        const comment = req.query.id;
        const post = req.query.postId;

        const docsRef = await db
            .collection('responses')
            .where('id', '==', post)
            .get();

        const docId = docsRef.docs[0].id;

        const docRef = await db.collection('responses').doc(docId);

        const data = await (await docRef.get()).data();

        const isCommentInDb = data.answers.filter(
            (answer) => answer.id === comment
        );

        if (!isCommentInDb) {
            res.status(404).end();
            return;
        }

        const isAuthor =
            data.answers.filter((answer) => answer.id === comment)[0].author
                .id === req.uid;

        if (!isAuthor) {
            res.status(401).end();
            return;
        }

        const filteredAnswers = data.answers.filter(
            (answer) => answer.id !== comment
        );

        await docRef.set({ answers: filteredAnswers }, { merge: true });

        const updatedSnapshot = await db
            .collection('responses')
            .where('id', '==', post)
            .get();

        if (!updatedSnapshot.empty) {
            const post = updatedSnapshot.docs[0].data();
            res.status(201).send(post);
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).end();
        return;
    }
};

export default withAuth(deleteComment);
