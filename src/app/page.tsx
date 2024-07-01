import Layout from './components/layout';

export default function Home() {
  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to ArtisanUI</h1>
        <p className="mt-2 text-gray-600">
          A collection of beautiful and functional UI components built with Next.js and Tailwind CSS.
        </p>
      </div>
    </Layout>
  );
}