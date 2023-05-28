import { Link } from 'react-router-dom'
import './style.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user'

import firebaseApp from '../../services/firebase'

import { getFirestore, addDoc, collection, getDocs, onSnapshot, query } from 'firebase/firestore'

const Dashboard = () => {

    const { signOut, user } = useContext(UserContext)

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any>([]);
    const [cartoes, setCartoes] = useState<any>([])

    useEffect(() => {

        const q = query(collection(db, "Cartoes"))
        onSnapshot(q, (querySnapshot) => {
            setCartoes(querySnapshot.docs.map(doc => ({
                data: doc.data()
            })))
            
            // const aux: any = []
            // querySnapshot.forEach((doc: any) => {
            //     console.log(doc.id, doc.data())
            //     aux.push({
            //         id: doc.id,
            //         ...doc.data()
            //     })

            // })
            // setMessages([...aux])
        })


        
    }, [])

    const db = getFirestore(firebaseApp)

    const handleAdd = async function () {

        const cartoes_json = {
            id: cartoes.id,
            value: cartoes.value,
            flipped: cartoes.flipped,
            matched: cartoes.matched
        }

        const docref = await addDoc(collection(db, "Cartoes"), cartoes_json)
        // console.log('docref', docref.id)

        // setMessages([...messages, message_json])
        setMessage("")
    }

    return (
        <>
        {/* Aqui começa a página normal que a gente conhece  */}

            {/* <input type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} />
            <button onClick={() => { handleAdd() }}>Enviar</button> */}

            {cartoes.map((c: any) => (
                <>
                    <div>{c.value}</div>
                    <div>{c.flipped}</div>
                    
                    
                </>
                
            ))}

            {/*
            Tentei puxar do fire, mas não vai. 
            <p>{cartoes[0].data.value}</p>
            <p>{cartoes[1].data.value}</p>
            <p>{cartoes[3].data.value}</p> */}
            
            <h1>Dashboard</h1>
            <Link to="/game" className="message">JOGAR!</Link>
            <div className='deslogar' onClick={() => signOut()}>Deslogar</div>
        </>
    )
}

export default Dashboard