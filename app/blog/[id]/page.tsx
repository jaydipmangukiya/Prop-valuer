import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogDetail from "@/app/views/blog/BlogDetail";

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <Header />
      <BlogDetail id={id} />
      <Footer />
    </div>
  );
}
