import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  name: string
  image: string
  href: string
  className?: string
}

export function CategoryCard({ name, image, href, className }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="relative w-full aspect-square mb-3 rounded-full overflow-hidden bg-muted/50">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <h3 className="text-sm font-medium">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  )
}

