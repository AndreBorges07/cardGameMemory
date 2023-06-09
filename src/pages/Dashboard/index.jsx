import { Link } from "react-router-dom";
import "./style.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user";

import firebaseApp from "../../services/firebase";

import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";

const Dashboard = () => {
  const { signOut } = useContext(UserContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [cartoes, setCartoes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Cartoes"));
    onSnapshot(q, (querySnapshot) => {
      setCartoes(
        querySnapshot.docs.map((doc) => ({
          data: doc.data(),
        }))
      );
    });
  }, []);

  const db = getFirestore(firebaseApp);

  const handleAdd = async function () {
    const cartoes_json = {
      id: cartoes.id,
      value: cartoes.value,
      flipped: cartoes.flipped,
      matched: cartoes.matched,
    };

    const docref = await addDoc(collection(db, "Cartoes"), cartoes_json);
    setMessage("");
  };

  return (
    <>
      {/* Aqui começa a página normal que a gente conhece */}
      {/* <input type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} />
            <button onClick={() => { handleAdd() }}>Enviar</button> */}
      
      {cartoes.map((c) => (
        <div key={c.id}>
          <div>{c.value}</div>
          <div>{c.flipped}</div>
        </div>
      ))}

<div class="container">
 <div class="wrapper">
   <div class="banner-image"> </div>
   <h1> Dashbord</h1>
   <p>Jogo da memória! Teste sua memória decorando os nomes dos frameworks</p>
  </div>
  <div class="button-wrapper"> 
  
    
    <Link to="/game" className="btn fill">
        Jogar
      </Link>
    <button class="btn outline" onClick={() => signOut()}>Deslogar</button>
  </div>
    </div>

    </>
  );
};

export default Dashboard;
