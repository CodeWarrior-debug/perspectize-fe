import { YouTubeVideo, YouTubeVideoResponse, EquipmentComparison } from '../types/youtube';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export const fetchYouTubeVideoMock = async (): Promise<YouTubeVideoResponse> => {
  
  await sleep(800);
  
  // Mock data for video: https://www.youtube.com/watch?v=wzgsNBKtaE4
  return {
    items: [
      {
        id: "wzgsNBKtaE4",
        snippet: {
          title: "Which is better for home gyms, kettlebells or dumbbells?",
          channelTitle: "Fringe Sport",
          channelId: "UCbq1NSm0kE2gZZWRxXFhe0Q", 
          categoryId: "17", 
          tags: [
            "kettlebells", 
            "dumbbells", 
            "home gym", 
            "fitness equipment", 
            "strength training", 
            "workout equipment",
            "free weights",
            "home workout"
          ],
          description: "A detailed comparison of kettlebells and dumbbells for home gyms. We examine the pros and cons of each and help you decide which is best for your fitness goals."
        },
        contentDetails: {
          duration: "PT8M20S" // 8 minutes and 20 seconds
        },
        statistics: {
          viewCount: "45829",
          likeCount: "2103",
          commentCount: "187"
        }
      }
    ]
  };
};

export const fetchEquipmentComparison = async (): Promise<EquipmentComparison[]> => {
  
    await sleep(800);
  
  return [
    {
      id: "kettlebell-1",
      equipmentType: "kettlebell",
      advantages: [
        "Great for dynamic, explosive movements",
        "Excellent for full-body workouts",
        "Builds functional strength and stability",
        "Perfect for cardio and strength combined",
        "Develops grip strength",
        "Takes up less space than dumbbells"
      ],
      bestExercises: [
        "Kettlebell swings",
        "Turkish get-ups",
        "Clean and press",
        "Goblet squats",
        "Snatches"
      ],
      targetMuscles: [
        "Full body",
        "Core",
        "Posterior chain",
        "Shoulders",
        "Grip"
      ],
      skillLevel: "intermediate",
      bestFor: [
        "Functional fitness",
        "HIIT workouts",
        "Metabolic conditioning",
        "Small spaces"
      ]
    },
    {
      id: "dumbbell-1",
      equipmentType: "dumbbell",
      advantages: [
        "More beginner-friendly",
        "Better for isolated muscle targeting",
        "Wide variety of exercise options",
        "More comfortable for certain exercises",
        "Easier to progressively overload",
        "Familiar to most gym-goers"
      ],
      bestExercises: [
        "Bicep curls",
        "Shoulder press",
        "Bench press",
        "Lateral raises",
        "Lunges"
      ],
      targetMuscles: [
        "Biceps",
        "Triceps",
        "Chest",
        "Shoulders",
        "Quadriceps"
      ],
      skillLevel: "beginner",
      bestFor: [
        "Muscle building",
        "Bodybuilding",
        "Beginners",
        "Targeted strength development"
      ]
    }
  ];
};

const API_KEY = import.meta.env.VITE_YT_API_KEY; 

export const fetchYouTubeVideoLive = async (
  id: string
): Promise<YouTubeVideoResponse> => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?` +
      new URLSearchParams({
        part: 'snippet,contentDetails,statistics',
        id,
        key: API_KEY!,
      })
  );
  if (!res.ok) throw new Error('YouTube API error');
  return res.json();
};

const FORCE_MOCK = import.meta.env.VITE_FORCE_MOCK === 'true';

export const fetchSingleVideo = async (
  id = 'wzgsNBKtaE4'
): Promise<YouTubeVideo> => {
  const res = API_KEY && !FORCE_MOCK
    ? await fetchYouTubeVideoLive(id)
    : await fetchYouTubeVideoMock();
  return res.items[0];
};


export const formatDuration = (iso: string): string => {
  if (!iso) return '0:00';

  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';

  const h = Number(match[1] ?? 0);
  const m = Number(match[2] ?? 0);
  const s = Number(match[3] ?? 0);

  if (h === 0) return `${m}:${s.toString().padStart(2, '0')}`;
  return `${h}:${m.toString().padStart(2, '0')}:${s
    .toString()
    .padStart(2, '0')}`;
};
