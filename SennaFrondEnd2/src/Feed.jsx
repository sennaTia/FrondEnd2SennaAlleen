import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

function Feed({ user }) {

  const [activeTab, setActiveTab] = useState("home");
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const snapshot = await getDocs(collection(db, "posts"));

    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }));

    setPosts(data);
  }

  async function createPost(e) {
    e.preventDefault();

    if (!text.trim()) return;

    await addDoc(collection(db, "posts"), {
      username: user,
      caption: text,
      likes: 0,
      likedBy: []
    });

    setText("");
    loadPosts();
    setActiveTab("home");
  }

  async function removePost(post) {
    if (post.username !== user) return;

    await deleteDoc(doc(db, "posts", post.id));
    loadPosts();
  }

  async function likePost(post) {

    const alreadyLiked = post.likedBy?.includes(user);

    let updatedLikedBy = post.likedBy || [];

    if (alreadyLiked) {
      // unlike
      updatedLikedBy = updatedLikedBy.filter(u => u !== user);

      await updateDoc(doc(db, "posts", post.id), {
        likes: post.likes - 1,
        likedBy: updatedLikedBy
      });

    } else {
      // like
      updatedLikedBy.push(user);

      await updateDoc(doc(db, "posts", post.id), {
        likes: post.likes + 1,
        likedBy: updatedLikedBy
      });
    }

    loadPosts();
  }

  return (
    <div style={{ paddingBottom: "60px" }}>

      {/* HOME */}
      {activeTab === "home" && (
        <div>
          <h3>Tijdlijn</h3>

          {posts.map((p) => {

            const liked = p.likedBy?.includes(user);

            return (
              <div
                key={p.id}
                style={{
                  border: "1px solid #dbdbdb",
                  borderRadius: 3,
                  padding: 10,
                  marginBottom: 10
                }}
              >

                <b>{p.username}</b>

                <p>{p.caption}</p>

                {/* LIKE */}
                <button onClick={() => likePost(p)}>
                  {liked ? "❤️" : "🤍"} {p.likes}
                </button>

                {/* DELETE */}
                {p.username === user && (
                  <button
                    onClick={() => removePost(p)}
                    style={{
                      marginLeft: 10,
                      color: "red",
                      background: "none",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    Verwijderen
                  </button>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* POST MAKEN */}
      {activeTab === "add" && (
        <div>
          <h3>Nieuwe post</h3>

          <form onSubmit={createPost}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Wat wil je posten?"
              style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />

            <button
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: "#0095f6",
                color: "white",
                border: "none"
              }}
            >
              Posten
            </button>
          </form>
        </div>
      )}

      {/* NAV */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        background: "#fff",
        borderTop: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
      }}>
        <button onClick={() => setActiveTab("home")}>Home</button>
        <button onClick={() => setActiveTab("add")}>Post</button>
      </div>

    </div>
  );
}

export default Feed;