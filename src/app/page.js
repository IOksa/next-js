import CallForm from "@/components/CallForm/CallForm";
import styles from "./page.module.css";

export default function Home() {
    return (
        <>
           
            <main className={styles.main}>
                <CallForm/>
            </main>
         
        </>
    );
}
