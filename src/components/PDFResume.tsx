import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '../types/resume';

interface PDFResumeProps {
  resumeData: ResumeData;
  template: string;
  customization: {
    fontSize: number;
    primaryColor: string;
    textColor: string;
  };
}

// Register fonts
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf'
});

export function PDFResume({ resumeData, template, customization }: PDFResumeProps) {
  const { personalInfo, sections } = resumeData;
  const { fontSize, primaryColor, textColor } = customization;

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: 'Open Sans',
      fontSize: fontSize,
      color: textColor,
      backgroundColor: '#ffffff',
    },
    header: {
      marginBottom: 30,
      textAlign: 'center',
    },
    name: {
      fontSize: fontSize + 8,
      fontWeight: 'bold',
      marginBottom: 8,
      color: textColor,
    },
    contactInfo: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: 15,
      fontSize: fontSize - 2,
      color: textColor,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: fontSize + 2,
      fontWeight: 'bold',
      color: primaryColor,
      borderBottomWidth: 2,
      borderBottomColor: primaryColor,
      paddingBottom: 4,
      marginBottom: 12,
    },
    skillContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    skill: {
      backgroundColor: primaryColor,
      color: '#ffffff',
      padding: '4 8',
      borderRadius: 12,
      fontSize: fontSize - 2,
    },
    experienceItem: {
      marginBottom: 12,
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    jobTitle: {
      fontWeight: 'bold',
      fontSize: fontSize,
      color: textColor,
    },
    dateRange: {
      fontSize: fontSize - 2,
      color: textColor,
    },
    companyInfo: {
      fontSize: fontSize - 1,
      color: textColor,
      marginBottom: 6,
    },
    description: {
      fontSize: fontSize - 1,
      lineHeight: 1.4,
      color: textColor,
    },
  });

  const renderSection = (section: any) => {
    switch (section.type) {
      case 'skills':
        return (
          <View style={styles.section} key={section.id}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.skillContainer}>
              {section.content.skills?.map((skill: string, index: number) => (
                <Text key={index} style={styles.skill}>{skill}</Text>
              ))}
            </View>
          </View>
        );

      case 'experience':
        return (
          <View style={styles.section} key={section.id}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.content.experiences?.map((exp: any, index: number) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{exp.title}</Text>
                  <Text style={styles.dateRange}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyInfo}>
                  {exp.company} • {exp.location}
                </Text>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        );

      case 'education':
        return (
          <View style={styles.section} key={section.id}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.content.education?.map((edu: any, index: number) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{edu.degree}</Text>
                  <Text style={styles.dateRange}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.companyInfo}>
                  {edu.school} • {edu.location}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{personalInfo.email}</Text>
            <Text style={styles.contactItem}>{personalInfo.phone}</Text>
            <Text style={styles.contactItem}>{personalInfo.location}</Text>
            {personalInfo.website && (
              <Text style={styles.contactItem}>{personalInfo.website}</Text>
            )}
          </View>
        </View>

        {/* Sections */}
        {sections
          .sort((a, b) => a.order - b.order)
          .map(section => renderSection(section))}
      </Page>
    </Document>
  );
}