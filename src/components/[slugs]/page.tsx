import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import getComponent from '@/lib/getComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const component = await getComponent(params.slug)

    if (!component) {
        return {}
    }

    return {
        title: `${component.name} Component`,
        description: component.description,
        openGraph: {
            title: `${component.name} Component | UI Generator`,
            description: component.description,
            url: `https://www.youruigenerator.com/components/${params.slug}`,
            images: [
                {
                    url: `https://www.youruigenerator.com/og-images/${params.slug}.png`,
                    width: 1200,
                    height: 630,
                }
            ],
        },
    }
}

export default async function ComponentPage({ params }: Props) {
    const component = await getComponent(params.slug)

    if (!component) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{component.name}</h1>
            <p className="text-lg mb-6">{component.description}</p>
            <div className="text-6xl mb-8">
                <FontAwesomeIcon icon={component.icon} />
            </div>
            <p className="text-sm text-gray-600">Component Type: {component.type}</p>
            {/* Add your component generator UI here */}
        </div>
    )
}