import { View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export function ProgressBar({ completedTasks, totalTasks }) {
  const { theme } = useTheme();


  const safeTotal = Number(totalTasks) || 0;
  const safeCompleted = Number(completedTasks) || 0;
  const progressPercentage = safeTotal === 0 ? 4 : Math.min(100, 4 + (safeCompleted / safeTotal) * 96);
  const displayValue = Math.round(progressPercentage);

  return (
    <View style={{ marginVertical: 16 }}>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <Text style={{ fontWeight: 'bold', color: theme.text, flex: 1 }}>
          Progress
        </Text>
        <Text style={{ color: 'gray', fontWeight: 'bold' }}>
          {displayValue}%
        </Text>
      </View>

      <View style={{ height: 10, backgroundColor: '#E5E7EB', borderRadius: 10, overflow: 'hidden' }}>
        <View
          style={{
            height: '100%',
            backgroundColor: theme.header,
            width: `${progressPercentage}%`,
            borderRadius: 10
          }}
        />
      </View>
    </View>
  );
}