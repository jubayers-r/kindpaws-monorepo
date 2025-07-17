import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarDays } from "lucide-react";
import { motion } from "motion/react";

const CampaignCardDescription = ({ campaign }) => {
  const {
    title,
    shortDescription,
    image,
    goalAmount,
    collectedAmount,
    location,
    createdAt,
    ownerName,
    ownerPhoto,
    tags,
    isFeatured,
  } = campaign;

  const progress = Math.min(100, (collectedAmount / goalAmount) * 100).toFixed(
    0
  );

  return (
    <>
      {/* Image */}
      {/* <div className="relative h-52 w-full overflow-hidden"> */}

      {/* Featured Tag */}
      {/* {isFeatured && (
          <div className="absolute top-3 left-3">
            <Badge variant="destructive">Featured</Badge>
          </div>
        )} */}

      {/* Tag */}
      {/* {tags?.[0] && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className="bg-primary/90 text-white">
              #{tags[0]}
            </Badge>
          </div>
        )} */}
      {/* </div> */}

      <CardContent className="space-y-3">
        <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        {/* must no more than 5 words */}

        <p className="text-sm text-muted-foreground line-clamp-2">
          {shortDescription}
        </p>

        {/* Progress */}
        <div>
          <Progress value={progress} className="h-2 rounded-full" />
          <div className="flex justify-between text-xs mt-1 text-muted-foreground">
            <span>${collectedAmount} raised</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Owner */}
        <div className="flex items-center gap-3 mt-3">
          <img
            src={ownerPhoto}
            alt={ownerName}
            className="w-9 h-9 rounded-full border"
          />
          <div className="text-sm">
            <p className="font-medium leading-none">{ownerName}</p>
            <p className="text-xs text-muted-foreground">Campaign Creator</p>
          </div>
        </div>

        {/* CTA */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button className="w-full mt-2" variant="default">
            Donate Now
          </Button>
        </motion.div>
      </CardContent>
    </>
  );
};

export default CampaignCardDescription;
