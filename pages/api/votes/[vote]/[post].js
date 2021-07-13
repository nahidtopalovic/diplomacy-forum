import { db, firebase } from '../../../../utils/db/firebase';
import { withAuth } from '../../../../utils/middleware/withAuth';

const vote = async (req, res) => {
    console.log('query', req.query);
    const { vote, comment, post } = req.query;

    try {
        // UPVOTING
        if (vote == 'upvote') {
            if (comment) {
                await upVoteComm(req, res, post, comment);
            }
            await upVote(req, res, post);
        }

        // DOWNVOTING
        if (vote == 'downvote') {
            if (comment) {
                await downVoteComm(req, res, post, comment);
            }
            await downVote(req, res, post);
        }

        // UNVOTING
        if (vote == 'unvote') {
            if (comment) {
                await unVoteComm(req, res, post, comment);
            }

            await unVote(req, res, post);
        }
    } catch (err) {
        console.log(err);
    }
};

export default withAuth(vote);

//
// UPVOTE
//

const upVote = async (req, res, post) => {
    const docsRef = await db
        .collection('responses')
        .where('id', '==', post)
        .get();

    const docId = docsRef.docs[0].id;

    const docRef = db.collection('responses').doc(docId);

    const data = await (await docRef.get()).data();

    const isDownVoted =
        data.votes.find((vote) => vote.user === req.uid)?.vote === -1;

    if (isDownVoted) {
        await docRef.update({
            votes: firebase.firestore.FieldValue.arrayRemove({
                user: req.uid,
                vote: -1,
            }),
        });
        await docRef.update({
            score: firebase.firestore.FieldValue.increment(1),
        });
    }

    await docRef.update({
        votes: firebase.firestore.FieldValue.arrayUnion({
            user: req.uid,
            vote: 1,
        }),
    });

    await docRef.update({
        score: firebase.firestore.FieldValue.increment(1),
    });

    const updatedSnapshot = await db
        .collection('responses')
        .where('id', '==', post)
        .get();

    if (!updatedSnapshot.empty) {
        const post = updatedSnapshot.docs[0].data();
        res.status(201).send(post);
        return;
    }
};

//
// DOWNVOTE
//

const downVote = async (req, res, post) => {
    const docsRef = await db
        .collection('responses')
        .where('id', '==', post)
        .get();

    const docId = docsRef.docs[0].id;

    const docRef = await db.collection('responses').doc(docId);

    const data = await (await docRef.get()).data();

    const isUpVoted =
        data.votes.find((vote) => vote.user === req.uid)?.vote === 1;

    if (isUpVoted) {
        await docRef.update({
            votes: firebase.firestore.FieldValue.arrayRemove({
                user: req.uid,
                vote: 1,
            }),
        });
        await docRef.update({
            score: firebase.firestore.FieldValue.increment(-1),
        });
    }

    console.log('doc from downvoting:', data);

    await docRef.update({
        votes: firebase.firestore.FieldValue.arrayUnion({
            user: req.uid,
            vote: -1,
        }),
    });

    await docRef.update({
        score: firebase.firestore.FieldValue.increment(-1),
    });

    const updatedSnapshot = await db
        .collection('responses')
        .where('id', '==', post)
        .get();

    if (!updatedSnapshot.empty) {
        const post = updatedSnapshot.docs[0].data();
        res.status(201).send(post);
        return;
    }
};

//
// UNVOTE
//

const unVote = async (req, res, post) => {
    const docsRef = await db
        .collection('responses')
        .where('id', '==', post)
        .get();

    const docId = docsRef.docs[0].id;

    const docRef = await db.collection('responses').doc(docId);

    const valueOfVote = docsRef.docs[0]
        .data()
        .votes.find((ele) => ele.user === req.uid).vote;

    await docRef.update({
        votes: firebase.firestore.FieldValue.arrayRemove({
            user: req.uid,
            vote: valueOfVote,
        }),
    });

    await docRef.update({
        score: firebase.firestore.FieldValue.increment(-valueOfVote),
    });

    const updatedSnapshot = await db
        .collection('responses')
        .where('id', '==', post)
        .get();

    if (!updatedSnapshot.empty) {
        const post = updatedSnapshot.docs[0].data();
        res.status(200).send(post);
        return;
    }
};

//
// ROUTES FOR COMMENTS
//

//
// UPVOTE
//

const upVoteComm = async (req, res, post, comment) => {
    const docsRef = await db
        .collection('responses')
        .where('id', '==', post)
        .get();

    // TODO: get a reference to object that containts the answer in answers array!

    // const commentRef = await db
    // .collection('responses')
    // .where('id', '==', post).where('answers', 'array-contains')

    const docId = docsRef.docs[0].id;

    const docRef = db.collection('responses').doc(docId);

    const data = await (await docRef.get()).data();

    const isDownVoted =
        data.answers.votes.find((vote) => vote.user === req.uid)?.vote === -1;

    if (isDownVoted) {
        await docRef.update({
            'answers.votes': firebase.firestore.FieldValue.arrayRemove({
                user: req.uid,
                vote: -1,
            }),
        });
        await docRef.update({
            'answers.score': firebase.firestore.FieldValue.increment(1),
        });
    }

    await docRef.update({
        'answers.votes': firebase.firestore.FieldValue.arrayUnion({
            user: req.uid,
            vote: 1,
        }),
    });

    await docRef.update({
        'answers.score': firebase.firestore.FieldValue.increment(1),
    });

    const updatedSnapshot = await db
        .collection('responses')
        .where('id', '==', post)
        .get();

    if (!updatedSnapshot.empty) {
        const post = updatedSnapshot.docs[0].data();
        res.status(201).send(post);
        return;
    }
};

//
// DOWNVOTE
//

const downVoteComm = async (req, res, post) => {
    const docsRef = await db
        .collection('responses')
        .where('id', '==', post)
        .get();

    const docId = docsRef.docs[0].id;

    const docRef = await db.collection('responses').doc(docId);

    const data = await (await docRef.get()).data();

    const isUpVoted =
        data.answers.votes.find((vote) => vote.user === req.uid)?.vote === 1;

    if (isUpVoted) {
        await docRef.update({
            'answers.votes': firebase.firestore.FieldValue.arrayRemove({
                user: req.uid,
                vote: 1,
            }),
        });
        await docRef.update({
            'answers.score': firebase.firestore.FieldValue.increment(-1),
        });
    }

    console.log('doc from downvoting:', data);

    await docRef.update({
        'answers.votes': firebase.firestore.FieldValue.arrayUnion({
            user: req.uid,
            vote: -1,
        }),
    });

    await docRef.update({
        'answers.score': firebase.firestore.FieldValue.increment(-1),
    });

    const updatedSnapshot = await db
        .collection('responses')
        .where('id', '==', post)
        .get();

    if (!updatedSnapshot.empty) {
        const post = updatedSnapshot.docs[0].data();
        res.status(201).send(post);
        return;
    }
};

//
// UNVOTE
//

const unVoteComm = async (req, res, post) => {
    const docsRef = await db
        .collection('responses')
        .where('id', '==', post)
        .get();

    const docId = docsRef.docs[0].id;

    const docRef = await db.collection('responses').doc(docId);

    const valueOfVote = docsRef.docs[0]
        .data()
        .answers.votes.find((ele) => ele.user === req.uid).vote;

    await docRef.update({
        'answeres.votes': firebase.firestore.FieldValue.arrayRemove({
            user: req.uid,
            vote: valueOfVote,
        }),
    });

    await docRef.update({
        'answers.score': firebase.firestore.FieldValue.increment(-valueOfVote),
    });

    const updatedSnapshot = await db
        .collection('responses')
        .where('id', '==', post)
        .get();

    if (!updatedSnapshot.empty) {
        const post = updatedSnapshot.docs[0].data();
        res.status(200).send(post);
        return;
    }
};
