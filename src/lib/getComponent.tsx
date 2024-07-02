import { components, funnyComponents } from '@/data/Components';

export default async function getComponent(slug: string) {
    const allComponents = [...components, ...funnyComponents];

    const component = allComponents.find(comp => comp.link === `/components/${slug}` || comp.link === `/funny/${slug}`);

    if (component) {
        return {
            name: component.name,
            description: component.description,
            type: component.link.startsWith('/components') ? 'UI' : 'Funny',
            icon: component.icon,
        };
    }

    return null;
}