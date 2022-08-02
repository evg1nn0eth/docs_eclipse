import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import { useNavigation, withParams } from '../../routes/hooks';
import { withTranslation } from '../../hooks/useTranslations';
import { ROUTES_MAP as ROUTES_SETTINGS_MAP } from './routes';

import { globalStyles } from '../../component-library/Global/theme';
import GlobalLayout from '../../component-library/Global/GlobalLayout';
import GlobalBackTitle from '../../component-library/Global/GlobalBackTitle';
import GlobalImage from '../../component-library/Global/GlobalImage';
import GlobalPadding from '../../component-library/Global/GlobalPadding';
import GlobalText from '../../component-library/Global/GlobalText';
import CardButton from '../../component-library/CardButton/CardButton';

import Avatar from '../../assets/images/Avatar.png';
import IconEditCircle from '../../assets/images/IconEditCircle.png';
import { AppContext } from '../../AppProvider';
import { getShortAddress, getWalletName } from '../../utils/wallet';

const AccountEditPage = ({ params, t }) => {
  const navigate = useNavigation();
  const [{ wallets, config }] = useContext(AppContext);
  const [wallet, setWallet] = useState({});
  useEffect(() => {
    const w = wallets.find(f => f.address === params.address);
    if (w) {
      setWallet(w);
    }
  }, [params.address, wallets]);
  const onBack = () => navigate(ROUTES_SETTINGS_MAP.SETTINGS_ACCOUNT_SELECT);

  const goToEditProfile = () =>
    navigate(ROUTES_SETTINGS_MAP.SETTINGS_ACCOUNT_EDIT_PROFILE, {
      address: params.address,
    });

  const goToEditName = () =>
    navigate(ROUTES_SETTINGS_MAP.SETTINGS_ACCOUNT_EDIT_NAME, {
      address: params.address,
    });

  const goToAddress = () =>
    navigate(ROUTES_SETTINGS_MAP.SETTINGS_ACCOUNT_EDIT_ADDRESS, {
      address: params.address,
    });

  const goToWalletNotifications = () =>
    navigate(ROUTES_SETTINGS_MAP.SETTINGS_ACCOUNT_EDIT_NOTIFICATIONS, {
      address: params.address,
    });

  const goToSeedPhrase = () =>
    navigate(ROUTES_SETTINGS_MAP.SETTINGS_ACCOUNT_EDIT_SEEDPHRASE, {
      address: params.address,
    });

  return (
    <GlobalLayout>
      <GlobalLayout.Header>
        <GlobalBackTitle
          onBack={onBack}
          title={t(`settings.wallets.edit_wallet`)}
        />

        <View style={globalStyles.centered}>
          <View style={globalStyles.floatingTransactionBox}>
            <GlobalImage
              source={Avatar}
              size="4xl"
              style={globalStyles.bigImage}
              circle
            />
            <CardButton
              onPress={goToEditProfile}
              buttonStyle={globalStyles.floatingTransaction}
              transparent>
              <GlobalImage source={IconEditCircle} size="md" circle />
            </CardButton>
          </View>
        </View>

        <GlobalPadding />

        <CardButton
          title={t(`general.name`)}
          actionIcon="right"
          onPress={goToEditName}>
          <GlobalText type="caption">
            {getWalletName(params.address, config)}
          </GlobalText>
        </CardButton>

        <CardButton
          title={t(`general.address`)}
          actionIcon="right"
          onPress={goToAddress}>
          <GlobalText type="caption">
            {getShortAddress(params.address)}
          </GlobalText>
        </CardButton>

        <CardButton
          title={t(`settings.notifications`)}
          actionIcon="right"
          onPress={goToWalletNotifications}
        />

        <CardButton
          title={t(`general.seed_phrase`)}
          actionIcon="right"
          onPress={goToSeedPhrase}
        />
      </GlobalLayout.Header>
    </GlobalLayout>
  );
};

export default withParams(withTranslation()(AccountEditPage));