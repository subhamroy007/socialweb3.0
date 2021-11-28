const comment = [
    {
        id: "CommentId_1",
        timestamp: 112233,
        author: "UserId_1",
        content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed non, earum eaque cum quasi, nobis perspiciatis molestias beatae laudantium quia mollitia tempora porro ipsa pariatur aspernatur dolor! Fugiat, ab illo.",
        likeInfo: {
            count: 25,
            list: [
                { id: "UserId_2", timestamp: 112233 },
                // Fill rest of the data
            ],
        },
        replyInfo: {
            count: 50,
            list: [
                {
                    id: "ReplyId_1",
                    timestamp: 112233,
                    author: "UserId_2",
                    content:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    likeInfo: {
                        count: 10,
                        list: [
                            { id: "UserId_1", timestamp: 112233 },
                            // Fill rest of the data
                        ],
                    },
                },
            ],
        },
    },
    // Fill rest of the data
];
