import { Outlet, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Container, Typography } from "@mui/material";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";

const queryClient = new QueryClient();

function Layout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

function NotFound() {
  return <Typography>404 Not Found</Typography>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TodoListPage />} />
          <Route path="todo/:id" element={<TodoDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
