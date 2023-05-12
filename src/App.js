import { Space } from "antd";
import "./App.css";
import Header from "./Components/Header";
import SideMenu from "./Components/SideMenu";
import PageContent from "./Components/PageContent";
import Footer from "./Components/Footer";

function App() {
    return (
        <>
            <div className="App">
                <Header />
                <div
                    style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        backgroundColor: "rgba(0,0,0,0.05)",
                    }}
                >
                    <SideMenu />
                    <PageContent />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default App;
