import BackgroundGenerator from '@/components/generators/BackgroundGenerator';
import TextGradientGenerator from '@/components/generators/TextGradientGenerator';
import Layout from '@/components/Layout';

export default function LayoutGeneratorPage() {
    return (
        <Layout>
            <TextGradientGenerator />
        </Layout>
    );
}