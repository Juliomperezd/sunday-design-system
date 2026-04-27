import { Routes, Route, Navigate } from 'react-router-dom';
import { MobileShell } from '../../components/MobileShell/MobileShell';
import { PROTOTYPES } from '../../prototypes';
import { PushScreen } from './screens/PushScreen';
import { SummaryScreen } from './screens/SummaryScreen';
import { ReviewFiguresScreen } from './screens/ReviewFiguresScreen';
import { LeaveCommentScreen } from './screens/LeaveCommentScreen';

const proto = PROTOTYPES.find((p) => p.key === 'end-of-service')!;

export function EndOfServiceFlow() {
  return (
    <MobileShell prototype={proto} resetPath="/end-of-service">
      <Routes>
        <Route index element={<PushScreen />} />
        <Route path="summary" element={<SummaryScreen />} />
        <Route path="review-figures" element={<ReviewFiguresScreen />} />
        <Route path="leave-comment" element={<LeaveCommentScreen />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </MobileShell>
  );
}
