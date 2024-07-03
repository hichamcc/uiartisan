import SnakeGame from '@/components/games/snake';
import Layout from '@/components/Layout';

export default function LayoutGeneratorPage() {
    return (
        <Layout>
            <SnakeGame />
        </Layout>
    );
}