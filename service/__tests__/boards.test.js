const { createNewBoard } = require("../src/boards");

const uid = "aNL7ZWQk9qRTXSjjwKnTknOgWyl1"; // test2@gmail.com

const user = {
  email: "test2@gmail.com",
  name: "test2@gmail.com",
  picture: "",
  uid: uid,
};

const start="1";
const finish="2";

describe("create new board", () => {
  it("should return boardId", async () => {
    const body = {
      admin: user,
      title: "Created from test!",
      start: start,
      finish : finish,
      coverPhoto:
        "https://images.unsplash.com/photo-1614268303585-a2d1200ab485?ixid=MnwyMDY2MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTY1MDcwODQ&ixlib=rb-1.2.1",
      visibility: "Public",
      users: [
        {
          uid: uid,
        },
      ],
    };

    const data = await createNewBoard(
      body.admin,
      body.title,
      body.start,
      body.finish,
      body.coverPhoto,
      body.visibility,
      body.users
    );
    expect(Object.keys(data)[0].substring(0, 2)).toBe("-M");
  });
  it("should return error", async () => {});
});
