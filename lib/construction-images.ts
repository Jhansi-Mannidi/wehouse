// Construction-themed images mapped by category
// These images are used throughout the app to replace placeholders

export const constructionImages = {
  // Room types
  bedroom: "/images/construction/bedroom-plastering.jpg",
  bathroom: "/images/construction/bathroom-waterproofing.jpg",
  kitchen: "/images/construction/kitchen-walls.jpg",
  livingRoom: "/images/construction/living-room-plastering.jpg",
  
  // Work types
  foundation: "/images/construction/foundation-work.jpg",
  plastering: "/images/construction/living-room-plastering.jpg",
  externalPlaster: "/images/construction/external-plaster.jpg",
  electrical: "/images/construction/electrical-work.jpg",
  plumbing: "/images/construction/plumbing-work.jpg",
  flooring: "/images/construction/flooring-work.jpg",
  painting: "/images/construction/painting-work.jpg",
  doorsWindows: "/images/construction/doors-windows.jpg",
  roofSlab: "/images/construction/roof-slab.jpg",
  
  // General
  overview: "/images/construction/site-overview.jpg",
  siteOverview: "/images/construction/site-overview.jpg",
  workers: "/images/construction/workers-team.jpg",
  team: "/images/construction/workers-team.jpg",
} as const

// Function to get image by category name (case-insensitive)
export function getConstructionImage(category: string): string {
  const normalizedCategory = category.toLowerCase().replace(/[\s-_]/g, '')
  
  const categoryMap: Record<string, keyof typeof constructionImages> = {
    'bedroom': 'bedroom',
    'bathroom': 'bathroom',
    'kitchen': 'kitchen',
    'livingroom': 'livingRoom',
    'foundation': 'foundation',
    'plastering': 'plastering',
    'internalplaster': 'plastering',
    'internalplastering': 'plastering',
    'externalplaster': 'externalPlaster',
    'externalplastering': 'externalPlaster',
    'electrical': 'electrical',
    'electricalfirstfix': 'electrical',
    'electricalfinal': 'electrical',
    'plumbing': 'plumbing',
    'plumbingfirstfix': 'plumbing',
    'plumbingfinal': 'plumbing',
    'flooring': 'flooring',
    'painting': 'painting',
    'doorswindows': 'doorsWindows',
    'doors': 'doorsWindows',
    'windows': 'doorsWindows',
    'roofslab': 'roofSlab',
    'slab': 'roofSlab',
    'overview': 'overview',
    'siteoverview': 'siteOverview',
    'workers': 'workers',
    'team': 'team',
    'structure': 'foundation',
    'brickwork': 'externalPlaster',
    'walls': 'livingRoom',
  }
  
  const key = categoryMap[normalizedCategory]
  if (key) {
    return constructionImages[key]
  }
  
  // Default fallback
  return constructionImages.siteOverview
}

// Get multiple random construction images for gallery views
export function getGalleryImages(count: number = 6): string[] {
  const allImages = Object.values(constructionImages)
  const shuffled = [...allImages].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
