import { Login } from "../pages/SignIn";
import { MainLayout } from "../layout/main-layout";
import { Routes, Route } from "react-router-dom";
import { CategoryList } from "../pages/CategoryList/categoryList";
import { Create } from "../pages/CreateCategory";
import { EditCategory } from "../pages/EditCategory";
import { SubCategory } from "../pages/SubCategory";
import { CreateSubCategory } from "../pages/SubCategory/createSub";


const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/app" element={<MainLayout />}>
                    <Route index element={<CategoryList />} />
                    <Route path="/app/create" element={<Create />} />
                    <Route path="/app/create-sub" element={<CreateSubCategory />} />
                    <Route path="/app/edit/:id" element={<EditCategory />} />
                    <Route path="/app/sub-category" element={<SubCategory />} />
                </Route>
            </Routes>
        </>
    )
}

export default Router