import { appBarStore } from "./AppBar/appBarStore";
import selectStore from "./Autocompletes/selectStores";
import contentFeedbackStore from "./ContentFeedback/contentFeedbackStore";
import { dcVisitorStore } from "./DCVisitors/DCVisitorStore";
import { labAssetStore } from "./LabAssets/labAssetStore";
import labUsageStore from "./LabUsage";
import { userStore } from "./Login/loginStore";
import projectStore from "./Project/projectStore";
import { schoolStore } from "./Schools/schoolStore";
import { studentListStore } from "./StudentList/studentListStore";
import { teacherStore } from "./Teacher/teacherStore";
import { trainingStore } from "./TeacherTraining/teacherTrainingStore";
import userProfileStore from "./UserProfile";
import { visitorStore } from "./Visitors/visitorStore";
import assetCallLogStore from "./AssetsCallLog";

export const useTeacherStore = teacherStore;
export const useUserStore = userStore;
export const useAppBarStore = appBarStore;
export const useProjectStore = projectStore;
export const useContentFeedbackStore = contentFeedbackStore;
export const useUserProfileStore = userProfileStore;
export const useSelectStore = selectStore;
export const useSchoolStore = schoolStore;
export const useLabUsageStore = labUsageStore;
export const useVisitorStore = visitorStore;
export const useDCVisitorStore = dcVisitorStore;
export const useStudentStore = studentListStore;
export const useLabAssetStore = labAssetStore;
export const useAssetCallLogStore = assetCallLogStore;

export interface AutoCompleteDropdown {
  id: string;
  label: string;
  value: string;
}
export const useTeacherTrainingStore = trainingStore;
