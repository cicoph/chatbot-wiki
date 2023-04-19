import { IconFileExport, IconSettings } from '@tabler/icons-react';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next';

import HomeContext from '@/pages/api/home/home.context';

import { SettingDialog } from '@/components/Settings/SettingDialog';

import { Import } from '../../Settings/Import';
import { Key } from '../../Settings/Key';
import { SidebarButton } from '../../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar.context';
import { ClearConversations } from './ClearConversations';
import { PluginKeys } from './PluginKeys';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export const ChatbarSettings = () => {
  const { t } = useTranslation('sidebar');
  const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);
  const router = useRouter()
  const {
    state: {
      apiKey,
      lightMode,
      serverSideApiKeyIsSet,
      serverSidePluginKeysSet,
      conversations,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const {
    handleClearConversations,
    handleImportConversations,
    handleExportData,
    handleApiKeyChange,
  } = useContext(ChatbarContext);

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {conversations.length > 0 ? (
        <ClearConversations onClearConversations={handleClearConversations} />
      ) : null}

      <Import onImport={handleImportConversations} />

      <SidebarButton
        text={t('Export data')}
        icon={<IconFileExport size={18} />}
        onClick={() => handleExportData()}
      />

      <SidebarButton
        text={t('Settings')}
        icon={<IconSettings size={18} />}
        onClick={() => setIsSettingDialog(true)}
      />

      <SidebarButton
        text={t('Logout')}
        icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
        onClick={() => router.push('/auth/signout')}
      />

      {!serverSideApiKeyIsSet ? (
        <Key apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
      ) : null}

      {!serverSidePluginKeysSet ? <PluginKeys /> : null}

      <SettingDialog
        open={isSettingDialogOpen}
        onClose={() => {
          setIsSettingDialog(false);
        }}
      />
    </div>
  );
};
