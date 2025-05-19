import { Feature } from '@/lib/types/chat'
import { FiMessageCircle, FiDatabase, FiLayers, FiLink } from 'react-icons/fi'

interface FeatureListProps {
  features?: Feature[]
}

const defaultFeatures: Feature[] = [
  {
    id: '1',
    title: 'Natural Language Conversations',
    icon: 'message'
  },
  {
    id: '2',
    title: 'Knowledge Base',
    icon: 'database'
  },
  {
    id: '3',
    title: 'Personalized Recommendations',
    icon: 'layers'
  },
  {
    id: '4',
    title: 'Seamless Integrations',
    icon: 'link'
  }
]

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'message':
      return <FiMessageCircle className="h-5 w-5" />
    case 'database':
      return <FiDatabase className="h-5 w-5" />
    case 'layers':
      return <FiLayers className="h-5 w-5" />
    case 'link':
      return <FiLink className="h-5 w-5" />
    default:
      return <FiMessageCircle className="h-5 w-5" />
  }
}

export const FeatureList = ({
  features = defaultFeatures
}: FeatureListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="flex items-start gap-3 rounded-md border p-4"
        >
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            {getIconComponent(feature.icon)}
          </div>
          <div>
            <h3 className="text-sm font-medium">{feature.title}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}
