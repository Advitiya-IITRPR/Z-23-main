import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";

export async function fetchAnnouncementData(dispatch) {
    await getDocs(collection(db, "announcement"))
        .then((querySnapshot) => {
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id: doc.id }));
            // dispatch({ type: "GET_PROFILE_ACTION", payload: newData });
            console.log(newData);
        })
    return;
}