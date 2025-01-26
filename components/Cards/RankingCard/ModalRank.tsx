'use client';

import dayjs from 'dayjs';
import { DonutChart } from '@mantine/charts';
import {
  ColorSwatch,
  Flex,
  Modal,
  ModalProps,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { RowApi } from '@/api';
import { RankingResponse, Row } from '@/api/modules/ranking/interfaces';
import BaseInfoTooltip from '@/components/Tooltips/BaseInfoTooltip';
import { formatNumber } from '@/utils';

interface ModalRankProps extends ModalProps {
  row: Row | undefined;
  ranking: RankingResponse;
}

export default function ModalRank(props: ModalRankProps): JSX.Element {
  const { row, ranking, ...others } = props;
  const theme = useMantineTheme();

  if (!row) {
    return (
      <Modal title="Errore" {...others}>
        Errore
      </Modal>
    );
  }

  const rankingDate = dayjs(ranking.date);

  const { data } = RowApi.useRow(row.id);

  return (
    <Modal title={`Dettaglio ranking ${row.athlete.fullName}`} size="lg" {...others}>
      <Stack ta="center">
        <Paper radius="xl" p="md" withBorder>
          <SimpleGrid
            cols={{ base: 2, md: 4 }}
            spacing="xs"
            verticalSpacing="xs"
            style={{ alignItems: 'flex-end' }}
          >
            <Stack gap={0}>
              <Text fw="bold" size="md">
                {row.position}
              </Text>
              <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
                Posizione
              </Text>
            </Stack>

            <Stack gap={0}>
              <Text fw="bold" size="md">
                {formatNumber(row.totalPoints)}
              </Text>
              <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
                Punti
              </Text>
            </Stack>

            <Stack gap={0}>
              {data ? (
                <Text fw="bold" size="md">
                  {rankingDate.diff(dayjs(data.athlete.birthDate), 'year')}
                </Text>
              ) : (
                <Skeleton height={20} width="100%" />
              )}
              <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
                Età
                <BaseInfoTooltip text="Per alcune categorie di età, l'età è calcolata al 31 dicembre dell'anno in corso" />
              </Text>
            </Stack>

            <Stack gap={0}>
              {data ? (
                <Text fw="bold" size="md">
                  {data.club?.name ?? data.club?.codeLetter}
                </Text>
              ) : (
                <Skeleton height={20} width="100%" />
              )}
              <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
                Club
              </Text>
            </Stack>
          </SimpleGrid>
        </Paper>
        <Paper radius="xl" p="md" withBorder>
          <Title order={5} mb="sm">
            Competizioni
          </Title>
          {data ? (
            <SimpleGrid cols={{ base: 2, md: 2 }}>
              {data.competitions
                .sort((a, b) => a.orderInRank - b.orderInRank)
                .map((competition) => (
                  <Stack key={competition.id} gap={0}>
                    <Text fw="bold" size="md">
                      {formatNumber(competition.points, 0, 2)}
                    </Text>
                    <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
                      {competition.generalCompetition.type ?? competition.generalCompetition.name}
                    </Text>
                    <Text span size="xs" c="dimmed">
                      {[
                        competition.generalCompetition.dateStart,
                        competition.generalCompetition.place,
                      ]
                        .filter(Boolean)
                        .join(' - ')}
                    </Text>
                  </Stack>
                ))}
            </SimpleGrid>
          ) : (
            <Skeleton height={60} radius="lg" />
          )}
        </Paper>

        <Paper radius="xl" p="md" withBorder>
          <Title order={5} mb="sm">
            Composizione punteggio totale
            <BaseInfoTooltip
              text="Il punteggio totale è la somma dei punteggi ottenuti nelle competizioni valide per la classifica, per
            maggiori dettagli consulta il regolamento"
            />
          </Title>
          {data ? (
            <>
              <SimpleGrid cols={{ base: 2, md: 2 }} spacing="xs" verticalSpacing="xs">
                {data.competitions
                  .filter((c) => c.isValidForTotal)
                  .sort((a, b) => a.orderInRank - b.orderInRank)
                  .map((c, i) => (
                    <Flex key={i} align="center" ta="left">
                      <ColorSwatch
                        size={16}
                        color={
                          Object.keys(theme.colors).map((k) => theme.colors[k])[(i + 1) % 8][5]
                        }
                        withShadow={false}
                        mr={6}
                      />
                      <Text c="dimmed" fz="sm">
                        {c.generalCompetition.type ?? c.generalCompetition.name}
                      </Text>
                    </Flex>
                  ))}
              </SimpleGrid>

              <Flex justify="center">
                <DonutChart
                  paddingAngle={2.5}
                  data={
                    data?.competitions
                      .filter((c) => c.isValidForTotal)
                      .sort((a, b) => a.orderInRank - b.orderInRank)
                      .map((c, i) => ({
                        name: c.generalCompetition.type ?? c.generalCompetition.name,
                        value: c.points,
                        color: Object.keys(theme.colors).map((k) => theme.colors[k])[
                          (i + 1) % 8
                        ][5],
                      })) ?? []
                  }
                  labelsType="percent"
                  withTooltip={false}
                  withLabels
                  pieProps={{ cornerRadius: 5 }}
                />
              </Flex>
            </>
          ) : (
            <Skeleton height={60} radius="lg" />
          )}
        </Paper>
      </Stack>
    </Modal>
  );
}
