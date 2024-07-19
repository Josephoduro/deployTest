export const navLinks = [
    {
      label: "Home",
      route: "/",
      icon: "/assets/icons/home.svg",
    },
    {
      label: "Menu Generator",
      route: "/transformations/add/menu",
      icon: "/assets/icons/food-icon.svg",
    },
    {
      label: "Cooking Assistant",
      route: "/transformations/add/assistant",
      icon: "/assets/icons/cooking-assistant.svg",
    },
    {
      label: "Smart Leftovers",
      route: "/transformations/add/leftovers",
      icon: "/assets/icons/smart-leftover.svg",
    },
    {
      label: "Culinary Coach",
      route: "/transformations/add/culinary",
      icon: "/assets/icons/chef.svg",
    },
    {
      label: "Profile",
      route: "/profile",
      icon: "/assets/icons/profile.svg",
    },
    {
      label: "Buy Credits",
      route: "/credits",
      icon: "/assets/icons/bag.svg",
    },
  ];
  
  export const plans = [
    {
      _id: 1,
      name: "Free",
      icon: "/assets/icons/free-plan.svg",
      price: 0,
      credits: 20,
      inclusions: [
        {
          label: "20 Free Credits",
          isIncluded: true,
        },
        {
          label: "Basic Access to Services",
          isIncluded: true,
        },
        {
          label: "Priority Customer Support",
          isIncluded: false,
        },
        {
          label: "Priority Updates",
          isIncluded: false,
        },
      ],
    },
    {
      _id: 2,
      name: "Pro Package",
      icon: "/assets/icons/free-plan.svg",
      price: 40,
      credits: 120,
      inclusions: [
        {
          label: "120 Credits",
          isIncluded: true,
        },
        {
          label: "Full Access to Services",
          isIncluded: true,
        },
        {
          label: "Priority Customer Support",
          isIncluded: true,
        },
        {
          label: "Priority Updates",
          isIncluded: false,
        },
      ],
    },
    {
      _id: 3,
      name: "Premium Package",
      icon: "/assets/icons/free-plan.svg",
      price: 199,
      credits: 2000,
      inclusions: [
        {
          label: "2000 Credits",
          isIncluded: true,
        },
        {
          label: "Full Access to Services",
          isIncluded: true,
        },
        {
          label: "Priority Customer Support",
          isIncluded: true,
        },
        {
          label: "Priority Updates",
          isIncluded: true,
        },
      ],
    },
  ];
  
  export const transformationTypes = {
    menuGenerator: {
      type: "menu",
      title: "Menu Generator",
      subTitle: "Generates unique menu based on dietary preferences",
      config: { menu: true },
      icon: "menu.svg",
    },
    culinaryCoach: {
      type: "culinary",
      title: "Culinary Coach",
      subTitle: "Generates personalized cooking lessons",
      config: { culinary: true },
      icon: "chef.svg",
    },
    smartLeftovers: {
      type: "leftover",
      title: "Smart Leftovers",
      subTitle: "Suggests creative recipes using leftovers",
      config: { leftover: true },
      icon: "smart-leftover.svg",
    },
    cookingAssistant: {
      type: "assistant",
      title: "Cooking Assistant",
      subTitle: "Virtual cooking assistant that provides real-time, step-by-step guidance during cooking",
      config: {assistant: true},
      icon: "scan.svg",
    },
  };
  
  export const aspectRatioOptions = {
    "1:1": {
      aspectRatio: "1:1",
      label: "Square (1:1)",
      width: 1000,
      height: 1000,
    },
    "3:4": {
      aspectRatio: "3:4",
      label: "Standard Portrait (3:4)",
      width: 1000,
      height: 1334,
    },
    "9:16": {
      aspectRatio: "9:16",
      label: "Phone Portrait (9:16)",
      width: 1000,
      height: 1778,
    },
  };
  
  export const defaultValues = {
    title: "",
    aspectRatio: "",
    color: "",
    prompt: "",
    publicId: "",
  };
  
  export const creditFee = -1;