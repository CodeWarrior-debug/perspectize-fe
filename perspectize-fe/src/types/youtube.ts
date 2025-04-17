export interface YouTubeVideo {
    id: string;
    snippet: {
      title: string;
      channelTitle: string;
      channelId: string;
      categoryId: string;
      tags?: string[];
      description?: string;
      publishedAt?: string;
    };
    contentDetails: {
      duration: string; 
    };
    statistics?: {
      viewCount?: string;
      likeCount?: string;
      commentCount?: string;
    };
  }
  
  export interface YouTubeVideoResponse {
    items: YouTubeVideo[];
  }
  
  export interface EquipmentComparison {
    id: string;
    equipmentType: 'kettlebell' | 'dumbbell';
    advantages: string[];
    bestExercises: string[];
    targetMuscles: string[];
    skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'all';
    bestFor: string[];
  }